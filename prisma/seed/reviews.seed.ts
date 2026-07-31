import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedReviews() {
  console.log("🌱 Seeding Reviews...");

  await prisma.review.deleteMany();

  const users = await prisma.user.findMany();
  const partners = await prisma.partner.findMany();
  const services = await prisma.service.findMany();

  const reviews = [];

  for (let i = 0; i < 300; i++) {
    reviews.push({
      userId: users[Math.floor(Math.random() * users.length)].id,
      partnerId: partners[Math.floor(Math.random() * partners.length)].id,
      serviceId: services[Math.floor(Math.random() * services.length)].id,
      rating: Number((4 + Math.random()).toFixed(1)),
      comment: "Excellent service. Highly recommended.",
    });
  }

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log("✅ 300 Reviews Seeded");
}