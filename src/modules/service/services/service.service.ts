import api from "../api/interceptor";
import {
  ServiceResponse,
  SingleServiceResponse,
} from "../types/service.types";

class ServiceService {
  getAll() {
    return api.get<ServiceResponse>("/services");
  }

  getById(id: string) {
    return api.get<SingleServiceResponse>(`/services/${id}`);
  }

  getByCategory(categoryId: string) {
    return api.get<ServiceResponse>(
      `/services/category/${categoryId}`,
    );
  }

  search(keyword: string) {
    return api.get<ServiceResponse>(
      `/services/search`,
      {
        params: {
          q: keyword,
        },
      },
    );
  }
}

export default new ServiceService();