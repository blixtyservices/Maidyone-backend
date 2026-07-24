import prisma from "../../../lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import { CreateBookingBody } from "../types/booking.types";

class BookingRepository {
  async getAll(userId: string) {
    return prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        service: true,
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string, userId: string) {
    return prisma.booking.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        service: true,
        address: true,
        user: true,
      },
    });
  }

  async create(
    userId: string,
    bookingNumber: string,
    totalAmount: number,
    data: CreateBookingBody
  ) {
    return prisma.booking.create({
      data: {
        bookingNumber,

        userId,

        serviceId: data.serviceId,

        addressId: data.addressId,

        bookingDate: new Date(data.bookingDate),

        notes: data.notes,

        totalAmount,

        bookingStatus: BookingStatus.PENDING,

        paymentStatus: PaymentStatus.PENDING,
      },
      include: {
        service: true,
        address: true,
      },
    });
  }

  async updateStatus(
    id: string,
    bookingStatus: BookingStatus
  ) {
    return prisma.booking.update({
      where: {
        id,
      },
      data: {
        bookingStatus,
      },
    });
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus
  ) {
    return prisma.booking.update({
      where: {
        id,
      },
      data: {
        paymentStatus,
      },
    });
  }

  async cancel(id: string) {
    return prisma.booking.update({
      where: {
        id,
      },
      data: {
        bookingStatus: BookingStatus.CANCELLED,
      },
    });
  }

  async exists(id: string, userId: string) {
    return prisma.booking.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async bookingHistory(userId: string) {
    return prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        service: true,
        address: true,
      },
      orderBy: {
        bookingDate: "desc",
      },
    });
  }
}

export default new BookingRepository();