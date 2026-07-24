import { Router } from "express";

import PaymentController from "../controllers/payment.controller";
import AuthMiddleware from "../../../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /payments/health:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Payment Module Health Check
 *     responses:
 *       200:
 *         description: Payment module is working
 */
router.get(
  "/health",
  PaymentController.health
);

/**
 * @openapi
 * /payments/create-order:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Create Razorpay Payment Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - paymentMethod
 *             properties:
 *               bookingId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - ONLINE
 *                   - CASH
 *                   - WALLET
 *     responses:
 *       201:
 *         description: Payment order created successfully
 */
router.post(
  "/create-order",
  AuthMiddleware.authenticate,
  PaymentController.createOrder
);

/**
 * @openapi
 * /payments/verify:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Verify Razorpay Payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - razorpayOrderId
 *               - razorpayPaymentId
 *               - razorpaySignature
 *             properties:
 *               bookingId:
 *                 type: string
 *               razorpayOrderId:
 *                 type: string
 *               razorpayPaymentId:
 *                 type: string
 *               razorpaySignature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */
router.post(
  "/verify",
  AuthMiddleware.authenticate,
  PaymentController.verifyPayment
);

/**
 * @openapi
 * /payments/history:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Payment History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment history fetched successfully
 */
router.get(
  "/history",
  AuthMiddleware.authenticate,
  PaymentController.paymentHistory
);

/**
 * @openapi
 * /payments/{bookingId}:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Get Payment Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details fetched successfully
 */
router.get(
  "/:bookingId",
  AuthMiddleware.authenticate,
  PaymentController.getPayment
);

/**
 * @openapi
 * /payments/refund:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Request Refund
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - reason
 *             properties:
 *               bookingId:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Refund initiated successfully
 */
router.post(
  "/refund",
  AuthMiddleware.authenticate,
  PaymentController.refundPayment
);

/**
 * @openapi
 * /payments/invoice/{bookingId}:
 *   get:
 *     tags:
 *       - Payment
 *     summary: Generate Booking Invoice
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 */
router.get(
  "/invoice/:bookingId",
  AuthMiddleware.authenticate,
  PaymentController.invoice
);

/**
 * Razorpay Webhook
 */
router.post(
  "/webhook",
  PaymentController.webhook
);

export default router;