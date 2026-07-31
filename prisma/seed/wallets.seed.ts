import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedWallets() {
  console.log("🌱 Seeding Wallets...");

  const partners = await prisma.partner.findMany();

  for (const partner of partners) {
    await prisma.wallet.upsert({
      where: {
        partnerId: partner.id,
      },
      update: {
        balance: 2500,
        totalEarned: 35000,
        totalWithdrawn: 32500,
      },
      create: {
        partnerId: partner.id,
        balance: 2500,
        totalEarned: 35000,
        totalWithdrawn: 32500,
      },
    });
  }

  console.log(`✅ ${partners.length} Wallets Seeded`);
}