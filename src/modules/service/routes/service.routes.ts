import { Router } from "express";
import ServiceController from "../controllers/service.controller";

const router = Router();

/**
 * @openapi
 * /services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get All Services
 *     description: Returns all active services.
 *     responses:
 *       200:
 *         description: Services fetched successfully.
 */
router.get("/", ServiceController.getAll);

/**
 * @openapi
 * /services/search:
 *   get:
 *     tags:
 *       - Services
 *     summary: Search Services
 *     description: Search services by keyword.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: cleaning
 *     responses:
 *       200:
 *         description: Search completed successfully.
 */
router.get("/search", ServiceController.search);

/**
 * @openapi
 * /services/category/{categoryId}:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get Services By Category
 *     description: Returns all services for a category.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Services fetched successfully.
 */
router.get("/category/:categoryId", ServiceController.getByCategory);

/**
 * @openapi
 * /services/{id}:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get Service By ID
 *     description: Returns a single service.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service fetched successfully.
 *       404:
 *         description: Service not found.
 */
router.get("/:id", ServiceController.getById);

export default router;