import { NextFunction, Request, Response } from "express";
import BookingService from "../services/booking.service";
import {
  bookingIdSchema,
  createBookingSchema,
  createBookingFromCartSchema,
  updateBookingStatusSchema,
} from "../validations/booking.validation";

class BookingController {
  /**
   * GET /bookings
   */
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Replace with req.user.id after JWT authentication
      const userId = String(req.query.userId);

      const bookings = await BookingService.getAll(userId);

      return res.status(200).json({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /bookings/history
   */
  async history(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = String(req.query.userId);

      const bookings = await BookingService.history(userId);

      return res.status(200).json({
        success: true,
        message: "Booking history fetched successfully",
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /bookings/:id
   */
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = bookingIdSchema.parse({
        params: req.params,
      });

      const userId = String(req.query.userId);

      const booking = await BookingService.getById(
        params.id,
        userId
      );

      return res.status(200).json({
        success: true,
        message: "Booking fetched successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /bookings
   */
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = createBookingSchema.parse({
        body: req.body,
      });

      const userId = String(req.query.userId);

      const booking = await BookingService.create(
        userId,
        body
      );

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
 * POST /bookings/from-cart
 */
async createFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = createBookingFromCartSchema.parse({
      body: req.body,
    });

    const userId = String(req.query.userId);

    const booking =
      await BookingService.createFromCart(
        userId,
        body
      );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}
  /**
   * PATCH /bookings/:id/status
   */
  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params, body } = updateBookingStatusSchema.parse({
        params: req.params,
        body: req.body,
      });

      const userId = String(req.query.userId);

      const booking = await BookingService.updateStatus(
        params.id,
        userId,
        body
      );

      return res.status(200).json({
        success: true,
        message: "Booking status updated successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /bookings/:id/cancel
   */
  async cancel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = bookingIdSchema.parse({
        params: req.params,
      });

      const userId = String(req.query.userId);

      const booking = await BookingService.cancel(
        params.id,
        userId
      );

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookingController();