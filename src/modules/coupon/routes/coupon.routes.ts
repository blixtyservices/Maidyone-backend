import { Router } from "express";

import CouponController from "../controllers/coupon.controller";
import AuthMiddleware from "../../../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /coupons/health:
 *   get:
 *     tags:
 *       - Coupon
 *     summary: Coupon Module Health Check
 *     responses:
 *       200:
 *         description: Coupon module is working
 */
router.get(
  "/health",
  CouponController.health
);

/**
 * @openapi
 * /coupons:
 *   get:
 *     tags:
 *       - Coupon
 *     summary: Get Available Coupons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available coupons
 */
router.get(
  "/",
  AuthMiddleware.authenticate,
  CouponController.getCoupons
);

/**
 * @openapi
 * /coupons/{id}:
 *   get:
 *     tags:
 *       - Coupon
 *     summary: Get Coupon Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon details
 */
router.get(
  "/:id",
  AuthMiddleware.authenticate,
  CouponController.getCoupon
);

/**
 * @openapi
 * /coupons/validate/{bookingId}:
 *   post:
 *     tags:
 *       - Coupon
 *     summary: Validate Coupon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
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
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon validated successfully
 */
router.post(
  "/validate/:bookingId",
  AuthMiddleware.authenticate,
  CouponController.validateCoupon
);

/**
 * @openapi
 * /coupons/apply:
 *   post:
 *     tags:
 *       - Coupon
 *     summary: Apply Coupon
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
 *               - code
 *             properties:
 *               bookingId:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 */
router.post(
  "/apply",
  AuthMiddleware.authenticate,
  CouponController.applyCoupon
);

/**
 * @openapi
 * /coupons/remove:
 *   post:
 *     tags:
 *       - Coupon
 *     summary: Remove Coupon
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
 *             properties:
 *               bookingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon removed successfully
 */
router.post(
  "/remove",
  AuthMiddleware.authenticate,
  CouponController.removeCoupon
);

export default router;