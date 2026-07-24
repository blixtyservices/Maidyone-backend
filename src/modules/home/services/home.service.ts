import HomeRepository from "../repositories/home.repository";

class HomeService {
  async getHome(userId: string) {
    const [
      user,
      categories,
      popularServices,
      notificationCount,
    ] = await Promise.all([
      HomeRepository.getUser(userId),
      HomeRepository.getCategories(),
      HomeRepository.getPopularServices(),
      HomeRepository.getNotificationsCount(userId),
    ]);

    return {
      user,
      currentAddress: null, // Replace with AddressRepository.getDefaultAddress(userId)
      banners: [], // Replace with BannerRepository.getActiveBanners()
      categories,
      popularServices,
      featuredServices: [],
      offers: [],
      notifications: notificationCount,
    };
  }
}

export default new HomeService();