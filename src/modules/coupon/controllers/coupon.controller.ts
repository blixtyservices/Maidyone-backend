import { Request, Response } from "express";

import CouponService from "../services/coupon.service";

import {
  applyCouponSchema,
  removeCouponSchema,
  validateCouponSchema,
} from "../validations/coupon.validation";

class CouponController {
  /**
   * Health Check
   */
  async health(_: Request, res: Response) {
    return res.status(200).json({
      success: true,
      module: "Coupon",
      status: "Working",
    });
  }

  /**
   * Get Available Coupons
   */
  async getCoupons(_: Request, res: Response) {
    const coupons =
      await CouponService.getAvailableCoupons();

    return res.status(200).json({
      success: true,
      data: coupons,
    });
  }

  /**
   * Get Coupon By ID
   */
  async getCoupon(req: Request, res: Response) {
    const coupon =
      await CouponService.getCoupon(
  req.params.id as string
);

    return res.status(200).json({
      success: true,
      data: coupon,
    });
  }

  /**
   * Validate Coupon
   */
  async validateCoupon(
    req: Request,
    res: Response
  ) {
    const bookingId =
  req.params.bookingId as string;

    const body =
      validateCouponSchema.parse(
        req.body
      );

    const result =
      await CouponService.validateCoupon(
        bookingId,
        body
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  /**
   * Apply Coupon
   */
  async applyCoupon(
    req: Request,
    res: Response
  ) {
    const body =
      applyCouponSchema.parse(
        req.body
      );

    const booking =
      await CouponService.applyCoupon(
        req.user!.id,
        body
      );

    return res.status(200).json({
      success: true,
      message:
        "Coupon applied successfully.",
      data: booking,
    });
  }

  /**
   * Remove Coupon
   */
  async removeCoupon(
    req: Request,
    res: Response
  ) {
    const body =
      removeCouponSchema.parse(
        req.body
      );

    const booking =
      await CouponService.removeCoupon(
        req.user!.id,
        body
      );

    return res.status(200).json({
      success: true,
      message:
        "Coupon removed successfully.",
      data: booking,
    });
  }
}

export default new CouponController();