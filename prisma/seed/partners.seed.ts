import { PrismaClient, PartnerStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPartners() {
  console.log("🌱 Seeding Partners...");

  await prisma.partner.deleteMany();

  const partners = [];

  for (let i = 1; i <= 30; i++) {
    partners.push({
      fullName: `Partner ${i}`,
      phone: `900000${String(i).padStart(4, "0")}`,
      email: `partner${i}@maidyone.com`,
      password: "123456",
      experience: Math.floor(Math.random() * 8) + 1,
      rating: 4.5 + Math.random() * 0.5,
      totalJobs: Math.floor(Math.random() * 300),
      isAvailable: true,
      status: PartnerStatus.APPROVED,
    });
  }

  await prisma.partner.createMany({
    data: partners,
  });

  console.log("✅ 30 Partners Seeded");
}