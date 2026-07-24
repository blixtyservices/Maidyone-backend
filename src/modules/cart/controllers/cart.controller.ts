import { NextFunction, Request, Response } from "express";

import CartService from "../services/cart.service";

import {
  createCartSchema,
  updateCartSchema,
  cartItemSchema,
  applyCouponSchema,
} from "../validations/cart.validation";

class CartController {
  /**
   * GET /cart
   */
  async getCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Replace with req.user.id after JWT
      const userId = String(req.query.userId);

      const cart = await CartService.getCart(userId);

      return res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /cart
   */
  async addToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = createCartSchema.parse({
        body: req.body,
      });

      const userId = String(req.query.userId);

      const cart = await CartService.addToCart(
        userId,
        body
      );

      return res.status(201).json({
        success: true,
        message: "Item added to cart successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /cart/:itemId
   */
  async updateQuantity(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params, body } =
        updateCartSchema.parse({
          params: req.params,
          body: req.body,
        });

      const userId = String(req.query.userId);

      const cart =
        await CartService.updateQuantity(
          params.itemId,
          body,
          userId
        );

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /cart/:itemId
   */
  async removeItem(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } =
        cartItemSchema.parse({
          params: req.params,
        });

      const userId = String(req.query.userId);

      const cart =
        await CartService.removeItem(
          params.itemId,
          userId
        );

      return res.status(200).json({
        success: true,
        message: "Item removed successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /cart/clear
   */
  async clearCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = String(req.query.userId);

      const cart =
        await CartService.clearCart(userId);

      return res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /cart/apply-coupon
   */
  async applyCoupon(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } =
        applyCouponSchema.parse({
          body: req.body,
        });

      const userId = String(req.query.userId);

      const cart =
        await CartService.applyCoupon(
          userId,
          body.code
        );

      return res.status(200).json({
        success: true,
        message: "Coupon applied successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();