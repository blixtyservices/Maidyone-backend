import prisma from "../../../config/prisma";

class HomeRepository {
  async getUser(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        profileImage: true,
      },
    });
  }

  async getDefaultAddress(userId: string) {
    return prisma.address.findFirst({
      where: {
        userId,
        isDefault: true,
      },
      select: {
        id: true,
        label: true,
        houseNumber: true,
        landmark: true,
        area: true,
        city: true,
        state: true,
        pincode: true,
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

  async getBanners() {
    return prisma.banner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        pill1: true,
        pill2: true,
        estimatedTime: true,
        rating: true,
        buttonText: true,
        image: true,
        redirectUrl: true,
        redirectType: true,
      },
    });
  }

  async getQuickServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        totalBookings: "desc",
      },
      take: 4,
      select: {
        id: true,
        name: true,
        image: true,
        displayPriceMin: true,
        displayPriceMax: true,
      },
    });
  }

  async getExploreServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      take: 10,
      include: {
        category: true,
      },
    });
  }

  async getMostBookedServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        totalBookings: "desc",
      },
      take: 10,
    });
  }

  async getRebookServices(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: {
        userId,
        bookingStatus: "COMPLETED",
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return bookings.map((booking) => booking.service);
  }
}

export default new HomeRepository();