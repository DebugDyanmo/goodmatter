import nodemailer from "nodemailer";

/** Generate a 6-digit OTP */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Send OTP via email using SMTP (configure via env vars) */
export async function sendOtpEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"],
    port: Number(process.env["SMTP_PORT"] ?? 587),
    secure: false,
    auth: {
      user: process.env["SMTP_USER"],
      pass: process.env["SMTP_PASS"],
    },
  });

  await transporter.sendMail({
    from: `"GoodMatter" <${process.env["SMTP_FROM"] ?? process.env["SMTP_USER"]}>`,
    to,
    subject: "Your GoodMatter OTP",
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto">
        <h2 style="color:#15A9FF">GoodMatter</h2>
        <p>Your one-time password is:</p>
        <h1 style="letter-spacing:8px;color:#0f172a;background:#f1f5f9;padding:16px;border-radius:8px;text-align:center">${otp}</h1>
        <p style="color:#64748b;font-size:13px">Valid for 10 minutes. Do not share this code.</p>
      </div>
    `,
  });
}

/** Send OTP via SMS using Twilio */
export async function sendOtpSms(phone: string, otp: string) {
  const accountSid = process.env["TWILIO_ACCOUNT_SID"];
  const authToken  = process.env["TWILIO_AUTH_TOKEN"];
  const from       = process.env["TWILIO_PHONE_NUMBER"];

  if (!accountSid || !authToken || !from) {
    throw new Error("Twilio credentials not configured");
  }

  // Dynamic import to avoid issues if twilio is not installed
  const twilio = (await import("twilio")).default;
  const client = twilio(accountSid, authToken);

  await client.messages.create({
    body: `Your GoodMatter OTP is: ${otp}. Valid for 10 minutes.`,
    from,
    to: phone,
  });
}
