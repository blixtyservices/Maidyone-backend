import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get All Categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get("/", CategoryController.getAll);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get Category By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 */
router.get("/:id", CategoryController.getById);

export default router;