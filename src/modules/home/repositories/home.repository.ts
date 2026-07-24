import prisma from "../../../lib/prisma";

class HomeRepository {
  async getCategories() {
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
        icon: true,
        image: true,
      },
    });
  }

  async getPopularServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
      take: 10,
    });
  }

  async getUser(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getNotificationsCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}

export default new HomeRepository();