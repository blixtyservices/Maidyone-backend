import CartRepository from "../repositories/cart.repository";

import ServiceRepository from "../../service/repositories/service.repository";
import PackageRepository from "../../package/repositories/package.repository";

import {
  CreateCartBody,
  UpdateCartBody,
} from "../types/cart.types";

class CartService {
  /**
   * Platform Fee
   */
  private readonly PLATFORM_FEE = 29;

  /**
   * GST (18%)
   */
  private readonly GST = 0.18;

  /**
   * Get Cart
   */
  async getCart(userId: string) {
    let cart = await CartRepository.findCart(userId);

    if (!cart) {
      await CartRepository.createCart(userId);

      cart = await CartRepository.findCart(userId); 
    }

    return this.calculateSummary(cart!);
  }

  /**
   * Add Item
   */
  async addToCart(
    userId: string,
    body: CreateCartBody
  ) {
    const service = await ServiceRepository.getById(
      body.serviceId
    );

    if (!service) {
      throw new Error("Service not found.");
    }

    if (!service.isActive) {
      throw new Error("Service is unavailable.");
    }

    const packageItem =
      await PackageRepository.getById(
        body.packageId
      );

    if (!packageItem) {
      throw new Error("Package not found.");
    }

    let cart = await CartRepository.findCart(userId);

    if (!cart) {
      await CartRepository.createCart(userId);

cart = await CartRepository.findCart(userId);
    }

    const existing =
      await CartRepository.findExistingItem(
        cart!.id,
        body.serviceId,
        body.packageId
      );

    if (existing) {
      await CartRepository.updateQuantity(
        existing.id,
        existing.quantity + body.quantity
      );
    } else {
      await CartRepository.addItem(
        cart!.id,
        body.serviceId,
        body.packageId,
        body.quantity
      );
    }

    const updatedCart =
      await CartRepository.findCart(userId);

    return this.calculateSummary(updatedCart!);
  }

  /**
   * Update Quantity
   */
  async updateQuantity(
    itemId: string,
    body: UpdateCartBody,
    userId: string
  ) {
    const cart = await CartRepository.findCart(userId);

    if (!cart) {
      throw new Error("Cart not found.");
    }

    await CartRepository.updateQuantity(
      itemId,
      body.quantity
    );

    const updated =
      await CartRepository.findCart(userId);

    return this.calculateSummary(updated!);
  }

  /**
   * Remove Item
   */
  async removeItem(
    itemId: string,
    userId: string
  ) {
    const cart = await CartRepository.findCart(userId);

    if (!cart) {
      throw new Error("Cart not found.");
    }

    await CartRepository.removeItem(itemId);

    const updated =
      await CartRepository.findCart(userId);

    return this.calculateSummary(updated!);
  }

  /**
   * Clear Cart
   */
  async clearCart(userId: string) {
    const cart = await CartRepository.findCart(userId);

    if (!cart) {
      throw new Error("Cart not found.");
    }

    await CartRepository.clearCart(cart.id);

    const updated =
      await CartRepository.findCart(userId);

    return this.calculateSummary(updated!);
  }

  /**
   * Coupon
   * (Coming Later)
   */
  async applyCoupon(
  userId: string,
  code: string
) {
  throw new Error("Coupon feature is coming soon.");
}

  /**
   * Calculate Cart Summary
   */
  private calculateSummary(cart: any) {
    const subtotal = cart.items.reduce(
      (sum: number, item: any) =>
        sum + item.package.price * item.quantity,
      0
    );

    const discount = 0;

    const gst = subtotal * this.GST;

    const platformFee =
      cart.items.length > 0
        ? this.PLATFORM_FEE
        : 0;

    const total =
      subtotal + gst + platformFee - discount;

    return {
      items: cart.items,

      summary: {
        subtotal,

        discount,

        gst,

        platformFee,

        total,
      },
    };
  }
}

export default new CartService();