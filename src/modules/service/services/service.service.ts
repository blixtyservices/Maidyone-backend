import { ApiError } from "../../../common/errors";
import ServiceRepository from "../repositories/service.repository";

class ServiceService {
  async getAll() {
    return ServiceRepository.getAll();
  }

  async getById(id: string) {
    const service = await ServiceRepository.getById(id);

    if (!service) {
      throw new ApiError(404, "Service not found.");
    }

    return service;
  }

  async getByCategory(categoryId: string) {
    return ServiceRepository.getByCategory(categoryId);
  }

  async search(keyword: string) {
    return ServiceRepository.search(keyword);
  }
}

export default new ServiceService();