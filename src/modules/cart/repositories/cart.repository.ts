import prisma from "../../../lib/prisma";

class CartRepository {
  /**
   * Find User Cart
   */
  async findCart(userId: string) {
    return prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            service: true,
            package: true,
          },
        },
      },
    });
  }

  /**
   * Create Cart
   */
  async createCart(userId: string) {
    return prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  /**
   * Find Cart Item
   */
  async findCartItem(itemId: string) {
    return prisma.cartItem.findUnique({
      where: {
        id: itemId,
      },
      include: {
        service: true,
        package: true,
      },
    });
  }

  /**
   * Find Existing Item
   */
  async findExistingItem(
    cartId: string,
    serviceId: string,
    packageId: string
  ) {
    return prisma.cartItem.findFirst({
      where: {
        cartId,
        serviceId,
        packageId,
      },
    });
  }

  /**
   * Add Item
   */
  async addItem(
    cartId: string,
    serviceId: string,
    packageId: string,
    quantity: number
  ) {
    return prisma.cartItem.create({
      data: {
        cartId,
        serviceId,
        packageId,
        quantity,
      },
      include: {
        service: true,
        package: true,
      },
    });
  }

  /**
   * Update Quantity
   */
  async updateQuantity(
    itemId: string,
    quantity: number
  ) {
    return prisma.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity,
      },
    });
  }

  /**
   * Remove Item
   */
  async removeItem(itemId: string) {
    return prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });
  }

  /**
   * Clear Cart
   */
  async clearCart(cartId: string) {
    return prisma.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  }
}

export default new CartRepository();