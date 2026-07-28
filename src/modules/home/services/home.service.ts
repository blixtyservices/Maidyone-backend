import HomeRepository from "../repositories/home.repository";

class HomeService {
  async getHome(userId: string) {
    const [
      user,
      address,
      notifications,
      banners,
      quickServices,
      exploreServices,
      mostBooked,
      rebook,
    ] = await Promise.all([
      HomeRepository.getUser(userId),
      HomeRepository.getDefaultAddress(userId),
      HomeRepository.getNotificationsCount(userId),
      HomeRepository.getBanners(),
      HomeRepository.getQuickServices(),
      HomeRepository.getExploreServices(),
      HomeRepository.getMostBookedServices(),
      HomeRepository.getRebookServices(userId),
    ]);

    return {
      header: {
        user,
        address,
        notifications,
      },

      banners,

      quickServices,

      exploreServices,

      mostBooked,

      rebook,
    };
  }
}

export default new HomeService();