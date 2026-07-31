import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./seed/categories.seed";
import { seedServices } from "./seed/services.seed";
import { seedPackages } from "./seed/packages.seed";
import { seedBanners } from "./seed/banners.seed";
import { seedCoupons } from "./seed/coupons.seed";
import { seedPartners } from "./seed/partners.seed";
import { seedUsers } from "./seed/users.seed";
import { seedWallets } from "./seed/wallets.seed";
import { seedReviews } from "./seed/reviews.seed";
import { seedNotifications } from "./seed/notifications.seed";
import { seedAddresses } from "./seed/addresses.seed";
import { seedBookings } from "./seed/bookings.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("=================================");
  console.log("🚀 Starting Maidyone Database Seed");
  console.log("=================================\n");

  await seedCategories();
  await seedServices();
  await seedPackages();
  await seedBanners();
  await seedCoupons();
  await seedPartners();
  await seedUsers();
  await seedWallets();
  await seedReviews();
  await seedNotifications();
  await seedAddresses();
  await seedBookings();

  console.log("\n=================================");
  console.log("✅ Database Seeding Completed");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("❌ Seed Failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });