import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPackages() {
  console.log("🌱 Seeding Packages...");

  const services = await prisma.service.findMany();

  let totalPackages = 0;

  for (const service of services) {
    const existing = await prisma.package.findMany({
      where: {
        serviceId: service.id,
      },
    });

    if (existing.length > 0) {
      continue;
    }

    const basePrice = Number(service.displayPriceMin ?? 0);
    const duration = service.durationMinutes ?? 60;

    await prisma.package.createMany({
      data: [
        {
          serviceId: service.id,
          name: "Basic",
          description: `Basic package for ${service.name}`,
          price: basePrice,
          duration,
          isRecommended: false,
          isActive: true,
        },
        {
          serviceId: service.id,
          name: "Standard",
          description: `Standard package for ${service.name}`,
          price: Math.round(basePrice * 1.25),
          duration: Math.round(duration * 1.2),
          isRecommended: true,
          isActive: true,
        },
        {
          serviceId: service.id,
          name: "Premium",
          description: `Premium package for ${service.name}`,
          price: Math.round(basePrice * 1.5),
          duration: Math.round(duration * 1.5),
          isRecommended: false,
          isActive: true,
        },
      ],
    });

    totalPackages += 3;
  }

  console.log(`✅ ${totalPackages} Packages Seeded`);
}