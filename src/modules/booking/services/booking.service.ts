import { BookingStatus } from "@prisma/client";

import BookingRepository from "../repositories/booking.repository";
import ServiceRepository from "../../service/repositories/service.repository";
import AddressRepository from "../../address/repositories/address.repository";

import {
  CreateBookingBody,
  UpdateBookingStatusBody,
} from "../types/booking.types";

class BookingService {
  private generateBookingNumber() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000);

    return `MDY-${year}${month}${day}-${random}`;
  }

  async getAll(userId: string) {
    return BookingRepository.getAll(userId);
  }

  async getById(id: string, userId: string) {
    const booking = await BookingRepository.getById(id, userId);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    return booking;
  }

  async create(userId: string, data: CreateBookingBody) {
    const service = await ServiceRepository.getById(data.serviceId);

    if (!service) {
      throw new Error("Service not found.");
    }

    if (!service.isActive) {
      throw new Error("Selected service is currently unavailable.");
    }

    const address = await AddressRepository.getById(
      data.addressId,
      userId
    );

    if (!address) {
      throw new Error("Address not found.");
    }

    const bookingNumber = this.generateBookingNumber();

    const servicePrice = Number(service.basePrice);

    const discount = 0;

    const gst = 0;

    const platformFee = 0;

    const finalAmount =
      servicePrice + gst + platformFee - discount;

    return BookingRepository.create(
      userId,
      bookingNumber,
      {
        servicePrice,
        discount,
        gst,
        platformFee,
        finalAmount,
      },
      data
    );
  }

  async updateStatus(
    id: string,
    userId: string,
    body: UpdateBookingStatusBody
  ) {
    const booking = await BookingRepository.exists(id, userId);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.bookingStatus === BookingStatus.CANCELLED) {
      throw new Error(
        "Cancelled booking status cannot be updated."
      );
    }

    if (booking.bookingStatus === BookingStatus.COMPLETED) {
      throw new Error(
        "Completed booking status cannot be updated."
      );
    }

    return BookingRepository.updateStatus(
      id,
      body.bookingStatus as BookingStatus
    );
  }

  async cancel(id: string, userId: string) {
    const booking = await BookingRepository.exists(id, userId);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.bookingStatus === BookingStatus.CANCELLED) {
      throw new Error("Booking is already cancelled.");
    }

    if (booking.bookingStatus === BookingStatus.COMPLETED) {
      throw new Error(
        "Completed booking cannot be cancelled."
      );
    }

    return BookingRepository.cancel(id);
  }

  async history(userId: string) {
    return BookingRepository.bookingHistory(userId);
  }
}

export default new BookingService();