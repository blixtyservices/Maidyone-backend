import prisma from "../../../lib/prisma";

class ServiceRepository {
  async getAll() {
    return prisma.service.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        packages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.service.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        packages: true,
      },
    });
  }

  async getByCategory(categoryId: string) {
    return prisma.service.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      include: {
        category: true,
        packages: true,
      },
    });
  }

  async search(keyword: string) {
    return prisma.service.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        category: true,
        packages: true,
      },
    });
  }
}

export default new ServiceRepository();