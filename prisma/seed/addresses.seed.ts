import { PrismaClient, AddressType } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedAddresses() {
  console.log("🌱 Seeding Addresses...");

  await prisma.address.deleteMany();

  const users = await prisma.user.findMany();

  const cities = [
    { city: "Indore", state: "Madhya Pradesh" },
    { city: "Bhopal", state: "Madhya Pradesh" },
    { city: "Pune", state: "Maharashtra" },
    { city: "Mumbai", state: "Maharashtra" },
    { city: "Bengaluru", state: "Karnataka" }
  ];

  let count = 0;

  for (const user of users) {
    const location = cities[Math.floor(Math.random() * cities.length)];

    await prisma.address.create({
      data: {
        userId: user.id,
        fullName: user.fullName,
        phone: user.phone,
        houseNo: `${Math.floor(Math.random() * 500) + 1}`,
        area: "Residential Area",
        city: location.city,
        state: location.state,
        pincode: `${Math.floor(100000 + Math.random() * 899999)}`,
        addressType: AddressType.HOME,
        isDefault: true,
      },
    });

    count++;
  }

  console.log(`✅ ${count} Addresses Seeded`);
}