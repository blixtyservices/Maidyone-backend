import { Router } from "express";
import BookingController from "../controllers/booking.controller";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Bookings
 *   description: Booking Management APIs
 */

/**
 * @openapi
 * /bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get All Bookings
 *     description: Returns all bookings of the logged-in user.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bookings fetched successfully.
 */
router.get("/", BookingController.getAll);

/**
 * @openapi
 * /bookings/history:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get Booking History
 *     description: Returns completed and cancelled bookings of the logged-in user.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking history fetched successfully.
 */
router.get("/history", BookingController.history);

/**
 * @openapi
 * /bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get Booking By ID
 *     description: Returns booking details by booking ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking fetched successfully.
 *       404:
 *         description: Booking not found.
 */
router.get("/:id", BookingController.getById);

/**
 * @openapi
 * /bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create Booking
 *     description: Create an Instant or Scheduled booking.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - addressId
 *               - bookingType
 *             properties:
 *               serviceId:
 *                 type: string
 *                 example: cms35service123
 *
 *               addressId:
 *                 type: string
 *                 example: cms35address123
 *
 *               bookingType:
 *                 type: string
 *                 enum:
 *                   - INSTANT
 *                   - SCHEDULED
 *                 example: INSTANT
 *
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-01T10:00:00.000Z"
 *                 description: Required only when bookingType is SCHEDULED.
 *
 *               notes:
 *                 type: string
 *                 example: Need cleaning in the morning.
 *     responses:
 *       201:
 *         description: Booking created successfully.
 */
router.post("/", BookingController.create);

router.post(
  "/from-cart",
  BookingController.createFromCart
);

/**
 * @openapi
 * /bookings/{id}/status:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Update Booking Status
 *     description: Update the status of a booking.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingStatus
 *             properties:
 *               bookingStatus:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - ACCEPTED
 *                   - ARRIVING
 *                   - IN_PROGRESS
 *                   - COMPLETED
 *                   - CANCELLED
 *                 example: ACCEPTED
 *     responses:
 *       200:
 *         description: Booking status updated successfully.
 */
router.patch("/:id/status", BookingController.updateStatus);

/**
 * @openapi
 * /bookings/{id}/cancel:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Cancel Booking
 *     description: Cancel an existing booking.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully.
 *       404:
 *         description: Booking not found.
 */
router.patch("/:id/cancel", BookingController.cancel);

export default router;