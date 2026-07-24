import Razorpay from "razorpay";
import crypto from "crypto";

class RazorpayProvider {
  private razorpay: Razorpay | null = null;

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn("⚠️ Razorpay is not configured. Payment APIs will be unavailable.");
      return;
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    console.log("✅ Razorpay Initialized");
  }

  private getClient(): Razorpay {
    if (!this.razorpay) {
      throw new Error("Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
    }

    return this.razorpay;
  }

  /**
   * Create Razorpay Order
   */
  async createOrder(
    amount: number,
    receipt: string,
    notes?: Record<string, string>
  ) {
    return this.getClient().orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
      notes,
    });
  }

  /**
   * Verify Payment Signature
   */
  verifySignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      throw new Error("RAZORPAY_KEY_SECRET is missing.");
    }

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    return expectedSignature === razorpaySignature;
  }

  /**
   * Verify Webhook Signature
   */
  verifyWebhookSignature(
    payload: string,
    signature: string
  ) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("RAZORPAY_WEBHOOK_SECRET is missing.");
    }

    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");

    return expected === signature;
  }

  /**
   * Fetch Payment
   */
  async fetchPayment(paymentId: string) {
    return this.getClient().payments.fetch(paymentId);
  }

  /**
   * Fetch Order
   */
  async fetchOrder(orderId: string) {
    return this.getClient().orders.fetch(orderId);
  }

  /**
   * Refund Payment
   */
  async refundPayment(
    paymentId: string,
    amount?: number
  ) {
    return this.getClient().payments.refund(paymentId, {
      amount: amount ? Math.round(amount * 100) : undefined,
    });
  }
}

export default new RazorpayProvider();