import { PrismaClient } from "@prisma/client";
import { serviceData } from "./service-data";

const prisma = new PrismaClient();

export async function seedServices() {
  console.log("🌱 Seeding Services...");

  let totalServices = 0;

  for (const categoryGroup of serviceData) {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryGroup.category,
      },
    });

    if (!category) {
      console.log(`⚠ Category not found: ${categoryGroup.category}`);
      continue;
    }

    for (const item of categoryGroup.services) {
      await prisma.service.upsert({
        where: {
          slug: item.slug,
        },
        update: {
          name: item.name,
          description: `${item.name} provided by verified Maidyone professionals.`,
          image: `https://cdn.maidyone.com/services/${item.slug}.jpg`,
          displayPriceMin: item.priceMin,
          displayPriceMax: item.priceMax,
          durationMinutes: item.duration,
          rating: 4.8,
          totalReviews: Math.floor(Math.random() * 500) + 50,
          totalBookings: Math.floor(Math.random() * 1000) + 100,
          isFeatured: item.featured,
          isPopular: item.popular,
          isActive: true,
          categoryId: category.id,
        },
        create: {
          categoryId: category.id,
          name: item.name,
          slug: item.slug,
          description: `${item.name} provided by verified Maidyone professionals.`,
          image: `https://cdn.maidyone.com/services/${item.slug}.jpg`,
          displayPriceMin: item.priceMin,
          displayPriceMax: item.priceMax,
          durationMinutes: item.duration,
          rating: 4.8,
          totalReviews: Math.floor(Math.random() * 500) + 50,
          totalBookings: Math.floor(Math.random() * 1000) + 100,
          isFeatured: item.featured,
          isPopular: item.popular,
          isActive: true,
        },
      });

      totalServices++;
    }
  }

  console.log(`✅ ${totalServices} Services Seeded`);
}