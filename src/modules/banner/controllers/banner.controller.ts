import { Request, Response } from "express";
import bannerService from "../services/banner.service";

class BannerController {
  async getAll(req: Request, res: Response) {
    try {
      const banners = await bannerService.getAllBanners();

      return res.status(200).json({
        success: true,
        message: "Banners fetched successfully",
        data: banners,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const banner = await bannerService.getBannerById(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Banner fetched successfully",
        data: banner,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
  try {
    const banner = await bannerService.createBanner({
      title: req.body.title,
      subtitle: req.body.subtitle,
      buttonText: req.body.buttonText,
      redirectUrl: req.body.redirectUrl,
      displayOrder: Number(req.body.displayOrder || 0),
      isActive: req.body.isActive === "true",
      image: (req.file as any)?.path,
    });

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

  async update(req: Request, res: Response) {
    try {
      const banner = await bannerService.updateBanner(
  req.params.id as string,
  req.body
);

      return res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: banner,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await bannerService.deleteBanner(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new BannerController();