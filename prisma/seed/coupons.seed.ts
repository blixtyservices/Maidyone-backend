import { PrismaClient, CouponType } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCoupons() {
  console.log("🌱 Seeding Coupons...");

  await prisma.coupon.deleteMany();

  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME100",
        title: "Welcome Offer",
        description: "Flat ₹100 Off",
        couponType: CouponType.FLAT,
        value: 100,
        minimumAmount: 499,
        maximumDiscount: 100,
        usageLimit: 1000,
        expiresAt: new Date("2027-12-31"),
      },
      {
        code: "SAVE20",
        title: "20% OFF",
        description: "Save 20%",
        couponType: CouponType.PERCENTAGE,
        value: 20,
        minimumAmount: 999,
        maximumDiscount: 500,
        usageLimit: 1000,
        expiresAt: new Date("2027-12-31"),
      },
      {
        code: "FIRSTBOOK",
        title: "First Booking",
        description: "Flat ₹200 Off",
        couponType: CouponType.FLAT,
        value: 200,
        minimumAmount: 799,
        maximumDiscount: 200,
        usageLimit: 500,
        expiresAt: new Date("2027-12-31"),
      },
    ],
  });

  console.log("✅ 3 Coupons Seeded");
}