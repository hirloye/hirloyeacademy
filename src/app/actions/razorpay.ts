"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import { processCoursePayment } from "./admin"; // We will reuse the DB update logic

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(amount: number) {
  try {
    const options = {
      amount: amount * 100, // Razorpay works in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return { success: true, order_id: order.id };
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return { error: "Failed to create payment order." };
  }
}

export async function verifyRazorpayPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  enrollmentId: string,
  formData: FormData // We need this to pass the education details and amount to processCoursePayment
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is legit! Let's update the database via our existing action
      const result = await processCoursePayment(enrollmentId, formData);
      return result;
    } else {
      return { error: "Invalid payment signature." };
    }
  } catch (error: any) {
    console.error("Razorpay Verify Error:", error);
    return { error: "Payment verification failed." };
  }
}
