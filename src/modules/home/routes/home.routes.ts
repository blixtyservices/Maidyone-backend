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
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Home data fetched successfully
 */
router.get("/", HomeController.home);

export default router;