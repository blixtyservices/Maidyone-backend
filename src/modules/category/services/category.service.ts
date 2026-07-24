import CategoryRepository from "../repositories/category.repository";

class CategoryService {
  async getAll() {
    return CategoryRepository.getAll();
  }

  async getById(id: string) {
    return CategoryRepository.getById(id);
  }
}

export default new CategoryService();