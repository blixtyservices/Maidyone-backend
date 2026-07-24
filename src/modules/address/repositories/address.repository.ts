import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import {
  CreateAddressBody,
  UpdateAddressBody,
} from "../types/address.types";

class AddressRepository {
  async getAll(userId: string) {
    return prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          isDefault: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async getById(id: string, userId: string) {
    return prisma.address.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(
    userId: string,
    data: CreateAddressBody & { isDefault?: boolean }
  ) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Remove previous default address
      if (data.isDefault) {
        await tx.address.updateMany({
          where: {
            userId,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }

      return tx.address.create({
        data: {
          userId,

          fullName: data.fullName,
          phone: data.phone,

          houseNo: data.houseNo,
          area: data.area,
          landmark: data.landmark,

          city: data.city,
          state: data.state,
          pincode: data.pincode,

          latitude: data.latitude,
          longitude: data.longitude,

          addressType: data.addressType,
          isDefault: data.isDefault ?? false,
        },
      });
    });
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAddressBody & { isDefault?: boolean }
  ) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (data.isDefault) {
        await tx.address.updateMany({
          where: {
            userId,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }

      return tx.address.update({
        where: {
          id,
        },
        data,
      });
    });
  }

  async delete(id: string, userId: string) {
    return prisma.address.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async setDefault(id: string, userId: string) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.address.updateMany({
        where: {
          userId,
        },
        data: {
          isDefault: false,
        },
      });

      return tx.address.update({
        where: {
          id,
        },
        data: {
          isDefault: true,
        },
      });
    });
  }

  async getDefault(userId: string) {
    return prisma.address.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    });
  }
}

export default new AddressRepository();