import { CouponType } from "@prisma/client";

import CouponRepository from "../repositories/coupon.repository";

import {
  ApplyCouponDto,
  RemoveCouponDto,
  ValidateCouponDto,
} from "../validations/coupon.validation";

class CouponService {
  /**
   * Get Available Coupons
   */
  async getAvailableCoupons() {
    return CouponRepository.getAvailableCoupons();
  }

  /**
   * Get Coupon By Id
   */
  async getCoupon(id: string) {
    const coupon = await CouponRepository.findCouponById(id);

    if (!coupon) {
      throw new Error("Coupon not found.");
    }

    return coupon;
  }

  /**
   * Validate Coupon
   */
  async validateCoupon(
    bookingId: string,
    data: ValidateCouponDto
  ) {
    const booking = await CouponRepository.findBooking(bookingId);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    const coupon = await CouponRepository.findCouponByCode(
      data.code
    );

    if (!coupon) {
      throw new Error("Invalid coupon.");
    }

    if (!coupon.isActive) {
      throw new Error("Coupon is inactive.");
    }

    if (coupon.expiresAt < new Date()) {
      throw new Error("Coupon has expired.");
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      throw new Error("Coupon usage limit exceeded.");
    }

    // Booking values are already numbers
    const servicePrice = booking.servicePrice.toNumber();
const gst = booking.gst.toNumber();
const platformFee = booking.platformFee.toNumber();

    // Coupon values are Prisma Decimal
    const minimumAmount = coupon.minimumAmount.toNumber();
    const couponValue = coupon.value.toNumber();
    const maximumDiscount = coupon.maximumDiscount
      ? coupon.maximumDiscount.toNumber()
      : null;

    if (servicePrice < minimumAmount) {
      throw new Error(
        `Minimum order amount should be ₹${minimumAmount}.`
      );
    }

    let discount = 0;

    if (coupon.couponType === CouponType.FLAT) {
      discount = couponValue;
    } else {
      discount = (servicePrice * couponValue) / 100;

      if (
        maximumDiscount !== null &&
        discount > maximumDiscount
      ) {
        discount = maximumDiscount;
      }
    }

    return {
      valid: true,
      coupon,
      discount,
      finalAmount:
        servicePrice +
        gst +
        platformFee -
        discount,
    };
  }

  /**
   * Apply Coupon
   */
  async applyCoupon(
    userId: string,
    data: ApplyCouponDto
  ) {
    const booking = await CouponRepository.findBooking(
      data.bookingId
    );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    const validation = await this.validateCoupon(
      booking.id,
      {
        code: data.code,
      }
    );

    const updated =
      await CouponRepository.applyCoupon(
        booking.id,
        validation.coupon.id,
        validation.discount,
        validation.finalAmount
      );

    await CouponRepository.increaseCouponUsage(
      validation.coupon.id
    );

    return updated;
  }

  /**
   * Remove Coupon
   */
  async removeCoupon(
    userId: string,
    data: RemoveCouponDto
  ) {
    const booking = await CouponRepository.findBooking(
      data.bookingId
    );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    if (!booking.couponId) {
      throw new Error("Coupon not applied.");
    }

    await CouponRepository.decreaseCouponUsage(
      booking.couponId
    );

    return CouponRepository.removeCoupon(
  booking.id,
  booking.servicePrice.toNumber(),
  booking.gst.toNumber(),
  booking.platformFee.toNumber()
);
  }
}

export default new CouponService();