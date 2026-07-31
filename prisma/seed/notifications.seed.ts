import { PrismaClient, NotificationType } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedNotifications() {
  console.log("🌱 Seeding Notifications...");

  await prisma.notification.deleteMany();

  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Welcome to Maidyone",
        message: "Thank you for choosing Maidyone.",
        type: NotificationType.GENERAL,
      },
    });

    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Flat ₹100 OFF",
        message: "Use coupon WELCOME100 on your next booking.",
        type: NotificationType.OFFER,
      },
    });
  }

  console.log(`✅ ${users.length * 2} Notifications Seeded`);
}