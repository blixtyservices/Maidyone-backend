import bannerRepository from "../repositories/banner.repository";

class BannerService {
  async getAllBanners() {
    return await bannerRepository.findAll();
  }

  async getBannerById(id: string) {
    const banner = await bannerRepository.findById(id);

    if (!banner) {
      throw new Error("Banner not found");
    }

    return banner;
  }

  async createBanner(data: any) {
    return await bannerRepository.create(data);
  }

  async updateBanner(id: string, data: any) {
    await this.getBannerById(id);

    return await bannerRepository.update(id, data);
  }

  async deleteBanner(id: string) {
    await this.getBannerById(id);

    return await bannerRepository.delete(id);
  }
}

export default new BannerService();