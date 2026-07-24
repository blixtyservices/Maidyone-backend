import { Request, Response, NextFunction } from "express";

import AddressService from "../services/address.service";

import {
  createAddressSchema,
  updateAddressSchema,
  getAddressSchema,
  deleteAddressSchema,
  setDefaultAddressSchema,
} from "../validations/address.validation";

class AddressController {
  /**
   * GET /addresses
   */
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Replace with req.user.id after JWT middleware
      const userId = String(req.query.userId);

      const addresses = await AddressService.getAll(userId);

      return res.status(200).json({
        success: true,
        message: "Addresses fetched successfully",
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /addresses/:id
   */
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = getAddressSchema.parse({
        params: req.params,
      });

      const userId = String(req.query.userId);

      const address = await AddressService.getById(
        params.id,
        userId
      );

      return res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /addresses
   */
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = createAddressSchema.parse({
        body: req.body,
      });

      const userId = String(req.query.userId);

      const address = await AddressService.create(
        userId,
        body
      );

      return res.status(201).json({
        success: true,
        message: "Address created successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /addresses/:id
   */
  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params, body } = updateAddressSchema.parse({
        params: req.params,
        body: req.body,
      });

      const userId = String(req.query.userId);

      const address = await AddressService.update(
        params.id,
        userId,
        body
      );

      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /addresses/:id
   */
  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = deleteAddressSchema.parse({
        params: req.params,
      });

      const userId = String(req.query.userId);

      const result = await AddressService.delete(
        params.id,
        userId
      );

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /addresses/:id/default
   */
  async setDefault(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = setDefaultAddressSchema.parse({
        params: req.params,
      });

      const userId = String(req.query.userId);

      const address = await AddressService.setDefault(
        params.id,
        userId
      );

      return res.status(200).json({
        success: true,
        message: "Default address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AddressController();