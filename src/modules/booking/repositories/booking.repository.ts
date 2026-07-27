import prisma from "../../../lib/prisma";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import { CreateBookingBody } from "../types/booking.types";

class BookingRepository {
  async getAll(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        address: true,
        package: true,
        coupon: true,
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
        package: true,
        coupon: true,
        partner: true,
        payment: true,
      },
    });
  }

  async create(
    userId: string,
    bookingNumber: string,
    pricing: {
      servicePrice: number;
      discount: number;
      gst: number;
      platformFee: number;
      finalAmount: number;
    },
    data: CreateBookingBody
  ) {
    return prisma.booking.create({
      data: {
        bookingNumber,
        userId,
        serviceId: data.serviceId,
        packageId: data.packageId ?? null,
        addressId: data.addressId,
        couponId: data.couponId ?? null,

        bookingType: data.bookingType,

        bookingDate:
          data.bookingType === "SCHEDULED" && data.bookingDate
            ? new Date(data.bookingDate)
            : new Date(),

        bookingTime:
          data.bookingType === "SCHEDULED"
            ? data.bookingTime ?? null
            : null,

        notes: data.notes ?? null,

        servicePrice: pricing.servicePrice,
        discount: pricing.discount,
        gst: pricing.gst,
        platformFee: pricing.platformFee,
        finalAmount: pricing.finalAmount,

        bookingStatus: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
      },

      include: {
        service: true,
        address: true,
        package: true,
        coupon: true,
      },
    });
  }

  async updateStatus(id: string, bookingStatus: BookingStatus) {
    return prisma.booking.update({
      where: { id },
      data: {
        bookingStatus,
      },
    });
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus) {
    return prisma.booking.update({
      where: { id },
      data: {
        paymentStatus,
      },
    });
  }

  async cancel(id: string) {
    return prisma.booking.update({
      where: { id },
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
      where: { userId },
      include: {
        service: true,
        address: true,
        package: true,
        partner: true,
      },
      orderBy: {
        bookingDate: "desc",
      },
    });
  }
}

export default new BookingRepository();