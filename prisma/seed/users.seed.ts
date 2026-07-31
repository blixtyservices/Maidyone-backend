import { PrismaClient, LoginType, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log("🌱 Seeding Users...");

  await prisma.user.deleteMany();

  const users = [];

  for (let i = 1; i <= 50; i++) {
    users.push({
      fullName: `Customer ${i}`,
      phone: `800000${String(i).padStart(4, "0")}`,
      email: `customer${i}@maidyone.com`,
      password: "123456",
      loginType: LoginType.PHONE,
      status: UserStatus.ACTIVE,
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log("✅ 50 Users Seeded");
}