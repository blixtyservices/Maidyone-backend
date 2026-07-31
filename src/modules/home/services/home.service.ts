import HomeRepository from "../repositories/home.repository";

class HomeService {
  async getHome(userId: string | null) {
    const [
      banners,
      quickServices,
      exploreServices,
      mostBooked,
    ] = await Promise.all([
      HomeRepository.getBanners(),
      HomeRepository.getQuickServices(),
      HomeRepository.getExploreServices(),
      HomeRepository.getMostBookedServices(),
    ]);

    if (!userId) {
      return {
        header: null,
        banners,
        quickServices,
        exploreServices,
        mostBooked,
        rebook: [],
      };
    }

    const [
      user,
      address,
      notifications,
      rebook,
    ] = await Promise.all([
      HomeRepository.getUser(userId),
      HomeRepository.getDefaultAddress(userId),
      HomeRepository.getNotificationsCount(userId),
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