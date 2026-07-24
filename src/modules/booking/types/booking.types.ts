export interface CreateBookingBody {
  serviceId: string;
  addressId: string;

  bookingDate: string;

  notes?: string;
}

export interface UpdateBookingStatusBody {
  bookingStatus:
    | "PENDING"
    | "ACCEPTED"
    | "ARRIVING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
}

export interface BookingParams {
  id: string;
}