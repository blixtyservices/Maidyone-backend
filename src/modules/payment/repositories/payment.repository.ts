import prisma from "../../../lib/prisma";

import {
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";

class PaymentRepository {
  /**
   * Find booking by ID
   */
  async findBooking(bookingId: string) {
    return prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        service: true,
        package: true,
        address: true,
        payment: true,
      },
    });
  }

  /**
   * Find payment by booking
   */
  async findPaymentByBooking(bookingId: string) {
    return prisma.payment.findUnique({
      where: {
        bookingId,
      },
    });
  }

  /**
   * Find payment by ID
   */
  async findPaymentById(paymentId: string) {
    return prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });
  }

  /**
   * Create payment
   */
  async createPayment(data: {
    bookingId: string;
    userId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    razorpayOrderId?: string;
  }) {
    return prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        userId: data.userId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        razorpayOrderId: data.razorpayOrderId,
      },
    });
  }

  /**
   * Update payment
   */
  async updatePayment(
    paymentId: string,
    data: {
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      paymentStatus?: PaymentStatus;
      paidAmount?: number;
      refundAmount?: number;
      refundReason?: string;
      refundedAt?: Date;
    }
  ) {
    return prisma.payment.update({
      where: {
        id: paymentId,
      },
      data,
    });
  }

  /**
   * Update booking payment status
   */
  async updateBookingPaymentStatus(
    bookingId: string,
    paymentStatus: PaymentStatus
  ) {
    return prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentStatus,
      },
    });
  }

  /**
   * Payment history
   */
  async paymentHistory(
    userId: string,
    page: number,
    limit: number
  ) {
    return prisma.payment.findMany({
      where: {
        userId,
      },
      include: {
        booking: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  /**
   * Count payments
   */
  async paymentCount(userId: string) {
    return prisma.payment.count({
      where: {
        userId,
      },
    });
  }

  /**
   * Delete payment
   */
  async deletePayment(paymentId: string) {
    return prisma.payment.delete({
      where: {
        id: paymentId,
      },
    });
  }
}

export default new PaymentRepository();