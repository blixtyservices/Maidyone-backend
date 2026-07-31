import { Router } from "express";
import HomeController from "../controllers/home.controller";

const router = Router();

/**
 * @openapi
 * /home:
 *   get:
 *     tags:
 *       - Home
 *     summary: Get Home Screen Data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home data fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", HomeController.home);

export default router;