import {
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";

import PaymentRepository from "../repositories/payment.repository";
import RazorpayProvider from "../providers/razorpay.provider";

import {
  CreateOrderDto,
  VerifyPaymentDto,
  RefundPaymentDto,
  PaymentHistoryDto,
} from "../validations/payment.validation";

class PaymentService {
  /**
   * Create Payment Order
   */
  async createOrder(userId: string, data: CreateOrderDto) {
    const booking = await PaymentRepository.findBooking(
      data.bookingId
    );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized booking.");
    }

    if (booking.paymentStatus === PaymentStatus.PAID) {
      throw new Error("Payment already completed.");
    }

    const existingPayment =
      await PaymentRepository.findPaymentByBooking(
        booking.id
      );

    if (existingPayment) {
      return existingPayment;
    }

    // Cash Payment
    if (data.paymentMethod === PaymentMethod.CASH) {
      return PaymentRepository.createPayment({
        bookingId: booking.id,
        userId,
        amount: booking.finalAmount,
        paymentMethod: PaymentMethod.CASH,
      });
    }

    // Wallet Payment
    if (data.paymentMethod === PaymentMethod.WALLET) {
      return PaymentRepository.createPayment({
        bookingId: booking.id,
        userId,
        amount: booking.finalAmount,
        paymentMethod: PaymentMethod.WALLET,
      });
    }

    // Razorpay Order
    const order =
      await RazorpayProvider.createOrder(
        booking.finalAmount,
        booking.bookingNumber,
        {
          bookingId: booking.id,
          bookingNumber: booking.bookingNumber,
        }
      );

    return PaymentRepository.createPayment({
      bookingId: booking.id,
      userId,
      amount: booking.finalAmount,
      paymentMethod: PaymentMethod.ONLINE,
      razorpayOrderId: order.id,
    });
  }

  /**
   * Verify Payment
   */
  async verifyPayment(
    userId: string,
    data: VerifyPaymentDto
  ) {
    const payment =
      await PaymentRepository.findPaymentByBooking(
        data.bookingId
      );

    if (!payment) {
      throw new Error("Payment not found.");
    }

    if (payment.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    const verified =
      RazorpayProvider.verifySignature(
        data.razorpayOrderId,
        data.razorpayPaymentId,
        data.razorpaySignature
      );

    if (!verified) {
      throw new Error("Payment verification failed.");
    }

    await PaymentRepository.updatePayment(
      payment.id,
      {
        razorpayPaymentId:
          data.razorpayPaymentId,

        razorpaySignature:
          data.razorpaySignature,

        paidAmount: payment.amount,

        paymentStatus:
          PaymentStatus.PAID,
      }
    );

    await PaymentRepository.updateBookingPaymentStatus(
      payment.bookingId,
      PaymentStatus.PAID
    );

    return {
      success: true,
      message: "Payment verified successfully.",
    };
  }

  /**
   * Payment History
   */
  async paymentHistory(
    userId: string,
    query: PaymentHistoryDto
  ) {
    const payments =
      await PaymentRepository.paymentHistory(
        userId,
        query.page,
        query.limit
      );

    const total =
      await PaymentRepository.paymentCount(
        userId
      );

    return {
      payments,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(
          total / query.limit
        ),
      },
    };
  }

  /**
   * Payment Details
   */
  async paymentDetails(
    bookingId: string,
    userId: string
  ) {
    const booking =
      await PaymentRepository.findBooking(
        bookingId
      );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    return booking.payment;
  }

  /**
   * Refund Payment
   */
  async refundPayment(
    userId: string,
    data: RefundPaymentDto
  ) {
    const payment =
      await PaymentRepository.findPaymentByBooking(
        data.bookingId
      );

    if (!payment) {
      throw new Error("Payment not found.");
    }

    if (payment.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    if (
      payment.paymentStatus !==
      PaymentStatus.PAID
    ) {
      throw new Error(
        "Only paid transactions can be refunded."
      );
    }

    if (
      payment.paymentMethod ===
      PaymentMethod.ONLINE
    ) {
      await RazorpayProvider.refundPayment(
        payment.razorpayPaymentId!,
        payment.amount
      );
    }

    await PaymentRepository.updatePayment(
      payment.id,
      {
        refundAmount: payment.amount,
        refundReason: data.reason,
        refundedAt: new Date(),
        paymentStatus:
          PaymentStatus.REFUNDED,
      }
    );

    await PaymentRepository.updateBookingPaymentStatus(
      payment.bookingId,
      PaymentStatus.REFUNDED
    );

    return {
      success: true,
      message:
        "Refund initiated successfully.",
    };
  }

  /**
   * Invoice
   */
  async generateInvoice(
    bookingId: string,
    userId: string
  ) {
    const booking =
      await PaymentRepository.findBooking(
        bookingId
      );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    return {
      bookingNumber:
        booking.bookingNumber,

      bookingDate:
        booking.bookingDate,

      service:
        booking.service.name,

      package:
        booking.package.name,

      amount:
        booking.servicePrice,

      discount:
        booking.discount,

      gst:
        booking.gst,

      platformFee:
        booking.platformFee,

      finalAmount:
        booking.finalAmount,

      paymentStatus:
        booking.paymentStatus,

      payment:
        booking.payment,
    };
  }
}

export default new PaymentService();