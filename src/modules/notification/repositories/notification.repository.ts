import prisma from "../../../lib/prisma";

class NotificationRepository {
  /**
   * Create Notification
   */
  async create(data: {
    userId: string;
    title: string;
    message: string;
    notificationType: any;
  }) {
    return prisma.notification.create({
      data,
    });
  }

  /**
   * Get Notifications
   */
  async findAll(
    userId: string,
    page: number,
    limit: number
  ) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  /**
   * Count Notifications
   */
  async count(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
      },
    });
  }

  /**
   * Find By ID
   */
  async findById(id: string) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Unread Count
   */
  async unreadCount(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark Read
   */
  async markRead(id: string) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  /**
   * Mark All Read
   */
  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  /**
   * Delete Notification
   */
  async delete(id: string) {
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}

export default new NotificationRepository();