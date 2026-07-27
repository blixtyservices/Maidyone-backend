import prisma from "../../../lib/prisma";

class CategoryRepository {
  async getAll() {
    return prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        image: true,
        bannerImage: true,
      },
    });
  }

  async getById(id: string) {
    return prisma.category.findFirst({
      where: {
        id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        image: true,
        bannerImage: true,
        isActive: true,
        displayOrder: true,
      },
    });
  }
}

export default new CategoryRepository();