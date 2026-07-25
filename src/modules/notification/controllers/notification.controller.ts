import { Request, Response } from "express";

import NotificationService from "../services/notification.service";

import {
  notificationQuerySchema,
} from "../validations/notification.validation";

class NotificationController {
  /**
   * Health Check
   */
  async health(_: Request, res: Response) {
    return res.status(200).json({
      success: true,
      module: "Notification",
      status: "Working",
    });
  }

  /**
   * Get Notification History
   */
  async getNotifications(
    req: Request,
    res: Response
  ) {
    const query = notificationQuerySchema.parse(
      req.query
    );

    const notifications =
      await NotificationService.getNotifications(
        req.user!.id,
        query
      );

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  }

  /**
   * Get Unread Count
   */
  async unreadCount(
    req: Request,
    res: Response
  ) {
    const result =
      await NotificationService.unreadCount(
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  /**
   * Mark Notification Read
   */
  async markRead(
    req: Request,
    res: Response
  ) {
    const notification =
      await NotificationService.markRead(
        req.user!.id,
        req.params.id as string
      );

    return res.status(200).json({
      success: true,
      message:
        "Notification marked as read.",
      data: notification,
    });
  }

  /**
   * Mark All Notifications Read
   */
  async markAllRead(
    req: Request,
    res: Response
  ) {
    const result =
      await NotificationService.markAllRead(
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }

  /**
   * Delete Notification
   */
  async deleteNotification(
    req: Request,
    res: Response
  ) {
    const result =
      await NotificationService.deleteNotification(
        req.user!.id,
        req.params.id as string
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }
}

export default new NotificationController();