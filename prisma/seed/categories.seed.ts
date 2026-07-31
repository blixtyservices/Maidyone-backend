import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCategories() {
  console.log("🌱 Seeding Categories...");

  const categories = [
    {
      name: "Home Cleaning",
      slug: "home-cleaning",
      description: "Complete home cleaning services",
      color: "#4F46E5",
      icon: "https://cdn.maidyone.com/icons/home-cleaning.png",
      image: "https://cdn.maidyone.com/categories/home-cleaning.jpg",
      banner: "https://cdn.maidyone.com/banners/home-cleaning.jpg",
      displayOrder: 1,
      isFeatured: true,
    },
    {
      name: "Deep Cleaning",
      slug: "deep-cleaning",
      description: "Deep cleaning for every corner",
      color: "#2563EB",
      icon: "https://cdn.maidyone.com/icons/deep-cleaning.png",
      image: "https://cdn.maidyone.com/categories/deep-cleaning.jpg",
      banner: "https://cdn.maidyone.com/banners/deep-cleaning.jpg",
      displayOrder: 2,
      isFeatured: true,
    },
    {
      name: "Bathroom Cleaning",
      slug: "bathroom-cleaning",
      description: "Professional bathroom cleaning",
      color: "#0EA5E9",
      icon: "https://cdn.maidyone.com/icons/bathroom.png",
      image: "https://cdn.maidyone.com/categories/bathroom.jpg",
      banner: "https://cdn.maidyone.com/banners/bathroom.jpg",
      displayOrder: 3,
    },
    {
      name: "Kitchen Cleaning",
      slug: "kitchen-cleaning",
      description: "Kitchen deep cleaning",
      color: "#14B8A6",
      icon: "https://cdn.maidyone.com/icons/kitchen.png",
      image: "https://cdn.maidyone.com/categories/kitchen.jpg",
      banner: "https://cdn.maidyone.com/banners/kitchen.jpg",
      displayOrder: 4,
    },
    {
      name: "Sofa Cleaning",
      slug: "sofa-cleaning",
      description: "Sofa shampooing and stain removal",
      color: "#22C55E",
      icon: "https://cdn.maidyone.com/icons/sofa.png",
      image: "https://cdn.maidyone.com/categories/sofa.jpg",
      banner: "https://cdn.maidyone.com/banners/sofa.jpg",
      displayOrder: 5,
    },
    {
      name: "Electrician",
      slug: "electrician",
      description: "Certified electricians",
      color: "#FACC15",
      icon: "https://cdn.maidyone.com/icons/electrician.png",
      image: "https://cdn.maidyone.com/categories/electrician.jpg",
      banner: "https://cdn.maidyone.com/banners/electrician.jpg",
      displayOrder: 6,
    },
    {
      name: "Plumber",
      slug: "plumber",
      description: "Expert plumbing services",
      color: "#3B82F6",
      icon: "https://cdn.maidyone.com/icons/plumber.png",
      image: "https://cdn.maidyone.com/categories/plumber.jpg",
      banner: "https://cdn.maidyone.com/banners/plumber.jpg",
      displayOrder: 7,
    },
    {
      name: "Carpenter",
      slug: "carpenter",
      description: "Furniture repair and installation",
      color: "#92400E",
      icon: "https://cdn.maidyone.com/icons/carpenter.png",
      image: "https://cdn.maidyone.com/categories/carpenter.jpg",
      banner: "https://cdn.maidyone.com/banners/carpenter.jpg",
      displayOrder: 8,
    },
    {
      name: "AC Service",
      slug: "ac-service",
      description: "AC installation and servicing",
      color: "#0284C7",
      icon: "https://cdn.maidyone.com/icons/ac.png",
      image: "https://cdn.maidyone.com/categories/ac.jpg",
      banner: "https://cdn.maidyone.com/banners/ac.jpg",
      displayOrder: 9,
    },
    {
      name: "Pest Control",
      slug: "pest-control",
      description: "Safe pest control solutions",
      color: "#16A34A",
      icon: "https://cdn.maidyone.com/icons/pest.png",
      image: "https://cdn.maidyone.com/categories/pest.jpg",
      banner: "https://cdn.maidyone.com/banners/pest.jpg",
      displayOrder: 10,
    }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: category,
      create: category,
    });
  }

  console.log(`✅ ${categories.length} Categories Seeded`);
}