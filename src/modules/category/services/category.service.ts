import { ApiError } from "../../../common/errors";
import CategoryRepository from "../repositories/category.repository";

class CategoryService {
  async getAll() {
    return CategoryRepository.getAll();
  }

  async getById(id: string) {
    const category = await CategoryRepository.getById(id);

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }

    return category;
  }
}

export default new CategoryService();