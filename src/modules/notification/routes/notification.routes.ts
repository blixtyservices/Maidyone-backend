import { Router } from "express";

import NotificationController from "../controllers/notification.controller";
import AuthMiddleware from "../../../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /notifications/health:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Notification Module Health Check
 *     responses:
 *       200:
 *         description: Notification module is working
 */
router.get(
  "/health",
  NotificationController.health
);

/**
 * @openapi
 * /notifications:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Get User Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get(
  "/",
  AuthMiddleware.authenticate,
  NotificationController.getNotifications
);

/**
 * @openapi
 * /notifications/unread-count:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Get Unread Notification Count
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count
 */
router.get(
  "/unread-count",
  AuthMiddleware.authenticate,
  NotificationController.unreadCount
);

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     tags:
 *       - Notification
 *     summary: Mark Notification as Read
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.patch(
  "/:id/read",
  AuthMiddleware.authenticate,
  NotificationController.markRead
);

/**
 * @openapi
 * /notifications/read-all:
 *   patch:
 *     tags:
 *       - Notification
 *     summary: Mark All Notifications as Read
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.patch(
  "/read-all",
  AuthMiddleware.authenticate,
  NotificationController.markAllRead
);

/**
 * @openapi
 * /notifications/{id}:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: Delete Notification
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */
router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  NotificationController.deleteNotification
);

export default router;