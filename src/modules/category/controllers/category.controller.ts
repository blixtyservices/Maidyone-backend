import { Request, Response } from "express";

import CategoryService from "../services/category.service";

class CategoryController {
  async getAll(req: Request, res: Response) {
    const data = await CategoryService.getAll();

    res.json({
      success: true,
      data,
    });
  }

  async getById(req: Request, res: Response) {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const data = await CategoryService.getById(id);

    res.json({
      success: true,
      data,
    });
  }
}

export default new CategoryController();