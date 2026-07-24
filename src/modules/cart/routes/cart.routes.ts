import { Router } from "express";
import CartController from "../controllers/cart.controller";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Cart
 *   description: Cart Management APIs
 */

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get User Cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/", CartController.getCart);

/**
 * @openapi
 * /api/cart:
 *   post:
 *     summary: Add Item To Cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - packageId
 *             properties:
 *               serviceId:
 *                 type: string
 *               packageId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Item added successfully
 */
router.post("/", CartController.addToCart);

/**
 * @openapi
 * /api/cart/{itemId}:
 *   patch:
 *     summary: Update Cart Quantity
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.patch("/:itemId", CartController.updateQuantity);

/**
 * @openapi
 * /api/cart/{itemId}:
 *   delete:
 *     summary: Remove Cart Item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully
 */
router.delete("/:itemId", CartController.removeItem);

/**
 * @openapi
 * /api/cart/clear:
 *   delete:
 *     summary: Clear Cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
router.delete("/clear", CartController.clearCart);

/**
 * @openapi
 * /api/cart/apply-coupon:
 *   post:
 *     summary: Apply Coupon
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 */
router.post(
  "/apply-coupon",
  CartController.applyCoupon
);

export default router;