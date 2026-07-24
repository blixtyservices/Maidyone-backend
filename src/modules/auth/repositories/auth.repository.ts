import { prisma } from "../../../config/prisma";

class AuthRepository {
  async findUserByPhone(phone: string) {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  async createUser(data: {
    fullName: string;
    phone: string;
    password: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export default new AuthRepository();