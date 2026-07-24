export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface VerifyPaymentPayload {
  bookingId: string;

  razorpayOrderId: string;

  razorpayPaymentId: string;

  razorpaySignature: string;
}