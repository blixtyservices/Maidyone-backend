import prisma from "../../../lib/prisma";

class CouponRepository {
  /**
   * Get all active coupons
   */
  async getAvailableCoupons() {
    return prisma.coupon.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Find coupon by ID
   */
  async findCouponById(id: string) {
    return prisma.coupon.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find coupon by code
   */
  async findCouponByCode(code: string) {
    return prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
      },
    });
  }

  /**
   * Find booking
   */
  async findBooking(bookingId: string) {
    return prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        coupon: true,
        service: true,
        user: true,
      },
    });
  }

  /**
   * Apply coupon to booking
   */
  async applyCoupon(
    bookingId: string,
    couponId: string,
    discount: number,
    finalAmount: number
  ) {
    return prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        couponId,
        discount,
        finalAmount,
      },
      include: {
        coupon: true,
      },
    });
  }

  /**
   * Remove coupon
   */
  async removeCoupon(
    bookingId: string,
    servicePrice: number,
    gst: number,
    platformFee: number
  ) {
    return prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        couponId: null,
        discount: 0,
        finalAmount:
          servicePrice +
          gst +
          platformFee,
      },
    });
  }

  /**
   * Increment coupon usage
   */
  async increaseCouponUsage(
    couponId: string
  ) {
    return prisma.coupon.update({
      where: {
        id: couponId,
      },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Decrement coupon usage
   */
  async decreaseCouponUsage(
    couponId: string
  ) {
    return prisma.coupon.update({
      where: {
        id: couponId,
      },
      data: {
        usedCount: {
          decrement: 1,
        },
      },
    });
  }
}

export default new CouponRepository();