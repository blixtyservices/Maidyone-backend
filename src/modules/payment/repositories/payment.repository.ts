import prisma from "../../../lib/prisma";
import {
  PaymentMethod,
  PaymentStatus,
  Prisma,
} from "@prisma/client";

class PaymentRepository {
  /**
   * Find booking
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
      include: {
        booking: {
          include: {
            service: true,
            package: true,
          },
        },
      },
    });
  }

  /**
   * Find payment by id
   */
  async findPaymentById(paymentId: string) {
    return prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        booking: {
          include: {
            service: true,
            package: true,
          },
        },
      },
    });
  }

  /**
   * Create payment
   */
  async createPayment(data: {
    bookingId: string;
    amount: Prisma.Decimal;
    paymentMethod: PaymentMethod;
    orderId?: string;
  }) {
    return prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        orderId: data.orderId,
      },
    });
  }

  /**
   * Update payment
   */
  async updatePayment(
    paymentId: string,
    data: {
      paymentId?: string;
      signature?: string;
      paymentStatus?: PaymentStatus;
      paidAt?: Date;
      refundAmount?: Prisma.Decimal;
      refundId?: string;
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
        booking: {
          userId,
        },
      },
      include: {
        booking: {
          include: {
            service: true,
            package: true,
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
        booking: {
          userId,
        },
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