import { ApiError } from "../../../common/errors";
import ServiceRepository from "../repositories/service.repository";

class ServiceService {
  async getAll() {
  const services = await ServiceRepository.getAll();

  return services.map(service => {
    const prices = service.packages.map(p => p.price);

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      image: service.image,

      category: service.category,

      displayPriceMin:
        prices.length > 0 ? Math.min(...prices) : 0,

      displayPriceMax:
        prices.length > 0 ? Math.max(...prices) : 0,
    };
  });
}

  async getById(id: string) {
    const service = await ServiceRepository.getById(id);

    if (!service) {
      throw new ApiError(404, "Service not found.");
    }

    return service;
  }

  async getByCategory(categoryId: string) {
  const services =
    await ServiceRepository.getByCategory(categoryId);

  return services.map(service => {
    const prices = service.packages.map(p => p.price);

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      image: service.image,

      category: service.category,

      displayPriceMin:
        prices.length ? Math.min(...prices) : 0,

      displayPriceMax:
        prices.length ? Math.max(...prices) : 0,
    };
  });
}

  async search(keyword: string) {
  const services =
    await ServiceRepository.search(keyword);

  return services.map(service => {
    const prices = service.packages.map(p => p.price);

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      image: service.image,

      category: service.category,

      displayPriceMin:
        prices.length ? Math.min(...prices) : 0,

      displayPriceMax:
        prices.length ? Math.max(...prices) : 0,
    };
  });
}
}

export default new ServiceService();