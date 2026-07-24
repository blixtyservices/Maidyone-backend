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
 * /api/bookings:
 *   get:
 *     summary: Get All Bookings
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking list fetched successfully
 */
router.get("/", BookingController.getAll);

/**
 * @openapi
 * /api/bookings/history:
 *   get:
 *     summary: Booking History
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking history fetched successfully
 */
router.get("/history", BookingController.history);

/**
 * @openapi
 * /api/bookings/{id}:
 *   get:
 *     summary: Get Booking By ID
 *     tags: [Bookings]
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
 *         description: Booking details fetched successfully
 */
router.get("/:id", BookingController.getById);

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Create Booking
 *     tags: [Bookings]
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
 *               - bookingDate
 *             properties:
 *               serviceId:
 *                 type: string
 *               addressId:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post("/", BookingController.create);

/**
 * @openapi
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update Booking Status
 *     tags: [Bookings]
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
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 */
router.patch("/:id/status", BookingController.updateStatus);

/**
 * @openapi
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel Booking
 *     tags: [Bookings]
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
 *         description: Booking cancelled successfully
 */
router.patch("/:id/cancel", BookingController.cancel);

export default router;