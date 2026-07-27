import { BookingStatus, PaymentStatus } from "@prisma/client";

export interface CreateBookingBody {
  serviceId: string;
  addressId: string;
  packageId?: string;
  couponId?: string;
  bookingType: "INSTANT" | "SCHEDULED";
  bookingDate?: string;
  bookingTime?: string;
  notes?: string;
}

export interface UpdateBookingStatusBody {
  bookingStatus: BookingStatus;
}

export interface UpdatePaymentStatusBody {
  paymentStatus: PaymentStatus;
}

export interface BookingParams {
  id: string;
}