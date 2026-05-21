import { Router, type IRouter } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router: IRouter = Router();

const PLAN_AMOUNTS: Record<string, number> = {
  monthly:   349900,   // ₹3,499 in paise
  quarterly: 699900,   // ₹6,999 in paise
  yearly:    3149900,  // ₹31,499 in paise
};

// ─── Create Razorpay Order ────────────────────────────────────────────────────
router.post("/payment/create-order", async (req, res) => {
  const keyId     = process.env["RAZORPAY_KEY_ID"];
  const keySecret = process.env["RAZORPAY_KEY_SECRET"];

  if (!keyId || !keySecret) {
    res.status(503).json({ error: "Payment gateway not configured" });
    return;
  }

  const { plan = "monthly" } = req.body as { plan?: string };
  const amount = PLAN_AMOUNTS[plan] ?? PLAN_AMOUNTS["monthly"]!;

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `gm_${Date.now()}`,
    notes: { plan },
  });

  res.json({
    orderId:  order.id,
    amount:   order.amount,
    currency: order.currency,
    keyId,
  });
});

// ─── Verify Payment Signature ─────────────────────────────────────────────────
// Call this after Razorpay checkout succeeds on the frontend
router.post("/payment/verify", (req, res) => {
  const keySecret = process.env["RAZORPAY_KEY_SECRET"];
  if (!keySecret) {
    res.status(503).json({ error: "Payment gateway not configured" });
    return;
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ error: "Invalid payment signature" });
    return;
  }

  // TODO: update subscription status in DB for the user
  res.json({ success: true, paymentId: razorpay_payment_id });
});

// ─── Razorpay Webhook ─────────────────────────────────────────────────────────
router.post("/payment/webhook", (req, res) => {
  const webhookSecret = process.env["RAZORPAY_WEBHOOK_SECRET"];
  if (!webhookSecret) {
    res.status(503).json({ error: "Webhook secret not configured" });
    return;
  }

  const signature = req.headers["x-razorpay-signature"] as string;
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  const event = req.body as { event: string };

  if (event.event === "payment.captured") {
    // TODO: activate subscription for user
  }

  res.json({ received: true });
});

export default router;
