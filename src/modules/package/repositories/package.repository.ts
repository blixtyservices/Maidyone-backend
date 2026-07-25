import prisma from "../../../lib/prisma";

class PackageRepository {
  async getById(id: string) {
    return prisma.package.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new PackageRepository();