import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedBanners() {
  console.log("🌱 Seeding Banners...");

  await prisma.banner.deleteMany();

  await prisma.banner.createMany({
    data: [
      {
        title: "Home Cleaning",
        subtitle: "Starting at ₹799",
        pill1: "Verified Professionals",
        pill2: "Same Day Service",
        estimatedTime: "2-4 Hours",
        rating: 4.9,
        buttonText: "Book Now",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
        redirectType: "CATEGORY",
        redirectUrl: "/category/home-cleaning",
        displayOrder: 1,
        isActive: true,
      },
      {
        title: "AC Service",
        subtitle: "Flat 25% OFF",
        pill1: "Gas Check",
        pill2: "Foam Cleaning",
        estimatedTime: "60 Minutes",
        rating: 4.8,
        buttonText: "Book Today",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",
        redirectType: "CATEGORY",
        redirectUrl: "/category/ac-service",
        displayOrder: 2,
        isActive: true,
      },
      {
        title: "Salon At Home",
        subtitle: "Beauty Experts",
        pill1: "Premium Products",
        pill2: "Verified Beauticians",
        estimatedTime: "90 Minutes",
        rating: 4.9,
        buttonText: "Explore",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
        redirectType: "CATEGORY",
        redirectUrl: "/category/salon",
        displayOrder: 3,
        isActive: true,
      },
      {
        title: "Electrician",
        subtitle: "Starting ₹199",
        pill1: "Instant Booking",
        pill2: "Trusted Experts",
        estimatedTime: "30 Minutes",
        rating: 4.8,
        buttonText: "Book Now",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a",
        redirectType: "CATEGORY",
        redirectUrl: "/category/electrician",
        displayOrder: 4,
        isActive: true,
      },
      {
        title: "Plumbing Service",
        subtitle: "Quick Repairs",
        pill1: "24×7 Available",
        pill2: "Experienced Staff",
        estimatedTime: "45 Minutes",
        rating: 4.8,
        buttonText: "Hire Now",
        image: "https://images.unsplash.com/photo-1581579188871-45ea61f2a6c8",
        redirectType: "CATEGORY",
        redirectUrl: "/category/plumbing",
        displayOrder: 5,
        isActive: true,
      }
    ],
  });

  console.log("✅ 5 Banners Seeded");
}