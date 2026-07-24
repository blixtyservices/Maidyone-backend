import { Request, Response } from "express";

import ServiceService from "../services/service.service";

import {
  getServiceByIdSchema,
  getServicesByCategorySchema,
  searchServiceSchema,
} from "../validations/service.validation";

class ServiceController {
  async getAll(req: Request, res: Response) {
    const services = await ServiceService.getAll();

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully.",
      data: services,
    });
  }

  async getById(req: Request, res: Response) {
    const { id } = getServiceByIdSchema.parse(req.params);

    const service = await ServiceService.getById(id);

    return res.status(200).json({
      success: true,
      message: "Service fetched successfully.",
      data: service,
    });
  }

  async getByCategory(req: Request, res: Response) {
    const { categoryId } = getServicesByCategorySchema.parse(req.params);

    const services = await ServiceService.getByCategory(categoryId);

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully.",
      data: services,
    });
  }

  async search(req: Request, res: Response) {
    const { q } = searchServiceSchema.parse(req.query);

    const services = await ServiceService.search(q);

    return res.status(200).json({
      success: true,
      message: "Search completed successfully.",
      data: services,
    });
  }
}

export default new ServiceController();