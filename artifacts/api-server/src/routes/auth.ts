import { Router, type IRouter } from "express";
import { db, usersTable, otpTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";
import { generateOtp, sendOtpEmail, sendOtpSms } from "../lib/otp.js";
import { signToken } from "../lib/jwt.js";

const router: IRouter = Router();

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

// ─── Send OTP ────────────────────────────────────────────────────────────────
router.post("/auth/send-otp", async (req, res) => {
  const { contact, role } = req.body as { contact: string; role: "founder" | "investor" };

  if (!contact || !role) {
    res.status(400).json({ error: "contact and role are required" });
    return;
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  // Store OTP (invalidate previous ones for same contact)
  await db.delete(otpTable).where(eq(otpTable.contact, contact));
  await db.insert(otpTable).values({ contact, code: otp, expiresAt });

  const isEmail = contact.includes("@");
  try {
    if (isEmail) {
      await sendOtpEmail(contact, otp);
    } else {
      await sendOtpSms(contact, otp);
    }
    res.json({ success: true, message: `OTP sent to ${contact}` });
  } catch (err) {
    // In dev, return OTP directly so you can test without SMTP/Twilio
    if (process.env["NODE_ENV"] !== "production") {
      res.json({ success: true, dev_otp: otp });
    } else {
      res.status(500).json({ error: "Failed to send OTP" });
    }
  }
});

// ─── Verify OTP & Login / Register ───────────────────────────────────────────
router.post("/auth/verify-otp", async (req, res) => {
  const { contact, code, role, name } = req.body as {
    contact: string;
    code: string;
    role: "founder" | "investor";
    name?: string;
  };

  if (!contact || !code || !role) {
    res.status(400).json({ error: "contact, code, and role are required" });
    return;
  }

  const [record] = await db
    .select()
    .from(otpTable)
    .where(
      and(
        eq(otpTable.contact, contact),
        eq(otpTable.code, code),
        gt(otpTable.expiresAt, new Date()),
        eq(otpTable.used, "false"),
      ),
    )
    .limit(1);

  if (!record) {
    res.status(400).json({ error: "Invalid or expired OTP" });
    return;
  }

  // Mark OTP as used
  await db.update(otpTable).set({ used: "true" }).where(eq(otpTable.id, record.id));

  const isEmail = contact.includes("@");

  // Find or create user
  let [user] = await db
    .select()
    .from(usersTable)
    .where(isEmail ? eq(usersTable.email, contact) : eq(usersTable.phone, contact))
    .limit(1);

  if (!user) {
    const [created] = await db
      .insert(usersTable)
      .values({
        email: isEmail ? contact : null,
        phone: isEmail ? null : contact,
        role,
        name: name ?? null,
      })
      .returning();
    user = created;
  }

  const token = signToken({ userId: user.id, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});

// ─── Sign Up ──────────────────────────────────────────────────────────────────
router.post("/auth/signup", async (req, res) => {
  const { name, email, phone, role } = req.body as {
    name: string;
    email: string;
    phone?: string;
    role: "founder" | "investor";
  };

  if (!name || !email || !role) {
    res.status(400).json({ error: "name, email, and role are required" });
    return;
  }

  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const [user] = await db
    .insert(usersTable)
    .values({ name, email, phone: phone ?? null, role })
    .returning();

  // Send OTP to verify email
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);
  await db.insert(otpTable).values({ contact: email, code: otp, expiresAt });

  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true, userId: user.id, message: "Account created. Check your email for OTP." });
  } catch {
    if (process.env["NODE_ENV"] !== "production") {
      res.json({ success: true, userId: user.id, dev_otp: otp });
    } else {
      res.status(500).json({ error: "Account created but failed to send OTP" });
    }
  }
});

// ─── Google OAuth callback ────────────────────────────────────────────────────
// Frontend uses Google Identity Services SDK to get an id_token, then POSTs it here.
// Setup (one-time, free): https://console.cloud.google.com → APIs & Services → Credentials
//   → Create OAuth 2.0 Client ID → Web application
//   → Authorised JS origins: https://yourdomain.com
//   → No redirect URI needed (we use the token flow, not code flow)
router.post("/auth/google", async (req, res) => {
  const { idToken, role } = req.body as { idToken: string; role: "founder" | "investor" };

  if (!idToken || !role) {
    res.status(400).json({ error: "idToken and role are required" });
    return;
  }

  const clientId = process.env["GOOGLE_CLIENT_ID"];
  if (!clientId) {
    res.status(503).json({ error: "Google OAuth not configured" });
    return;
  }

  // Verify the id_token with Google
  const verifyRes = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );
  const payload = await verifyRes.json() as {
    sub?: string; email?: string; name?: string; picture?: string; aud?: string; error_description?: string;
  };

  if (!verifyRes.ok || payload.aud !== clientId || !payload.sub) {
    res.status(401).json({ error: "Invalid Google token" });
    return;
  }

  const { sub: googleId, email, name, picture: avatarUrl } = payload;

  let [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.googleId, googleId!))
    .limit(1);

  if (!user) {
    const [byEmail] = email
      ? await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
      : [];

    if (byEmail) {
      const [updated] = await db
        .update(usersTable)
        .set({ googleId, avatarUrl: avatarUrl ?? byEmail.avatarUrl })
        .where(eq(usersTable.id, byEmail.id))
        .returning();
      user = updated;
    } else {
      const [created] = await db
        .insert(usersTable)
        .values({ googleId, email: email ?? null, name: name ?? null, avatarUrl: avatarUrl ?? null, role })
        .returning();
      user = created;
    }
  }

  const token = signToken({ userId: user.id, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email, avatarUrl: user.avatarUrl } });
});

// ─── Get current user ─────────────────────────────────────────────────────────
router.get("/auth/me", async (req, res) => {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const { verifyToken } = await import("../lib/jwt.js");
    const { userId } = verifyToken(header.slice(7));

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ id: user.id, name: user.name, role: user.role, email: user.email, avatarUrl: user.avatarUrl });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
