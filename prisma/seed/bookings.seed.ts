import {
  PrismaClient,
  BookingStatus,
  BookingType,
  PaymentStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function bookingNumber() {
  return "MDY" + Date.now() + Math.floor(Math.random() * 10000);
}

export async function seedBookings() {
  console.log("🌱 Seeding Bookings...");

  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();

  const users = await prisma.user.findMany();
  const partners = await prisma.partner.findMany();
  const services = await prisma.service.findMany({
    include: {
      packages: true,
    },
  });
  const addresses = await prisma.address.findMany();
  const coupons = await prisma.coupon.findMany();

  const statuses = [
    BookingStatus.PENDING,
    BookingStatus.CONFIRMED,
    BookingStatus.ASSIGNED,
    BookingStatus.STARTED,
    BookingStatus.COMPLETED,
    BookingStatus.CANCELLED,
  ];

  let total = 0;

  for (let i = 0; i < 500; i++) {
    const user = randomItem(users);

    const address = randomItem(
      addresses.filter((a) => a.userId === user.id)
    );

    const service = randomItem(services);

    const pkg =
      service.packages.length > 0
        ? randomItem(service.packages)
        : null;

    const partner = randomItem(partners);

    const coupon =
      Math.random() < 0.30
        ? randomItem(coupons)
        : null;

    const servicePrice = Number(pkg?.price ?? service.displayPriceMin ?? 500);

    const discount = coupon ? 100 : 0;

    const gst = Math.round(servicePrice * 0.18);

    const platformFee = 49;

    const finalAmount =
      servicePrice - discount + gst + platformFee;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber: bookingNumber(),

        userId: user.id,
        serviceId: service.id,
        packageId: pkg?.id,
        partnerId: partner.id,
        addressId: address.id,
        couponId: coupon?.id,

        bookingType:
          Math.random() > 0.5
            ? BookingType.INSTANT
            : BookingType.SCHEDULED,

        bookingDate: new Date(
          Date.now() - Math.random() * 180 * 86400000
        ),

        bookingTime: "10:00 AM",

        servicePrice,

        discount,

        gst,

        platformFee,

        finalAmount,

        bookingStatus: randomItem(statuses),

        paymentStatus: PaymentStatus.PAID,
      },
    });

    await prisma.payment.create({
      data: {
        bookingId: booking.id,

        amount: finalAmount,

        paymentMethod: "ONLINE",

        paymentStatus: PaymentStatus.PAID,

        paymentGateway: "Razorpay",

        paymentId: "pay_" + Math.random().toString(36).slice(2),

        orderId: "order_" + Math.random().toString(36).slice(2),

        paidAt: new Date(),
      },
    });

    total++;
  }

  console.log(`✅ ${total} Bookings Seeded`);
}