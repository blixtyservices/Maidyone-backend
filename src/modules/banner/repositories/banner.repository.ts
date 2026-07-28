import prisma from "../../../config/prisma";

export class BannerRepository {
  async findAll() {
    return prisma.banner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.banner.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return prisma.banner.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.banner.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.banner.delete({
      where: { id },
    });
  }
}

export default new BannerRepository();