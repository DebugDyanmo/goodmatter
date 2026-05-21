import { Router, type IRouter } from "express";
import Razorpay from "razorpay";

const router: IRouter = Router();

const PLAN_AMOUNTS: Record<string, number> = {
  monthly: 349900,   // ₹3,499 in paise
  quarterly: 699900, // ₹6,999 in paise
  yearly: 3149900,   // ₹31,499 in paise
};

router.post("/payment/create-order", async (req, res) => {
  const keyId = process.env["RAZORPAY_KEY_ID"];
  const keySecret = process.env["RAZORPAY_KEY_SECRET"];

  if (!keyId || !keySecret) {
    res.status(503).json({ error: "Payment gateway not configured" });
    return;
  }

  const { plan = "monthly" } = req.body as { plan?: string };
  const amount = PLAN_AMOUNTS[plan] ?? PLAN_AMOUNTS["monthly"];

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `gm_${Date.now()}`,
    notes: { plan },
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
  });
});

export default router;
