import { Request, Response } from "express";

import CategoryService from "../services/category.service";
import { categoryIdSchema } from "../validations/category.validation";

class CategoryController {
  async getAll(req: Request, res: Response) {
    const data = await CategoryService.getAll();

    return res.json({
      success: true,
      message: "Categories fetched successfully.",
      data,
    });
  }

  async getById(req: Request, res: Response) {
    const { id } = categoryIdSchema.parse(req.params);

    const data = await CategoryService.getById(id);

    return res.json({
      success: true,
      message: "Category fetched successfully.",
      data,
    });
  }
}

export default new CategoryController();