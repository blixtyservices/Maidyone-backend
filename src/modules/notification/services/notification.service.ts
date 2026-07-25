import { NotificationType } from "@prisma/client";

import NotificationRepository from "../repositories/notification.repository";

import {
  NotificationQueryDto,
} from "../validations/notification.validation";


class NotificationService {
  /**
   * Create Notification
   */
  async createNotification({
    userId,
    title,
    message,
    notificationType,
  }: {
    userId: string;
    title: string;
    message: string;
    notificationType: NotificationType;
  }) {
    const notification =
      await NotificationRepository.create({
        userId,
        title,
        message,
        notificationType,
      });

    return notification;
  }

  /**
   * Notification History
   */
  async getNotifications(
    userId: string,
    query: NotificationQueryDto
  ) {
    const notifications =
      await NotificationRepository.findAll(
        userId,
        query.page,
        query.limit
      );

    const total =
      await NotificationRepository.count(userId);

    return {
      notifications,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(
          total / query.limit
        ),
      },
    };
  }

  /**
   * Unread Count
   */
  async unreadCount(userId: string) {
    const count =
      await NotificationRepository.unreadCount(
        userId
      );

    return {
      unread: count,
    };
  }

  /**
   * Mark Read
   */
  async markRead(
    userId: string,
    notificationId: string
  ) {
    const notification =
      await NotificationRepository.findById(
        notificationId
      );

    if (!notification) {
      throw new Error(
        "Notification not found."
      );
    }

    if (notification.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    return NotificationRepository.markRead(
      notificationId
    );
  }

  /**
   * Mark All Read
   */
  async markAllRead(userId: string) {
    await NotificationRepository.markAllRead(
      userId
    );

    return {
      success: true,
      message:
        "All notifications marked as read.",
    };
  }

  /**
   * Delete Notification
   */
  async deleteNotification(
    userId: string,
    notificationId: string
  ) {
    const notification =
      await NotificationRepository.findById(
        notificationId
      );

    if (!notification) {
      throw new Error(
        "Notification not found."
      );
    }

    if (notification.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    await NotificationRepository.delete(
      notificationId
    );

    return {
      success: true,
      message:
        "Notification deleted successfully.",
    };
  }
}

export default new NotificationService();