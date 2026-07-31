import { Request, Response } from "express";
import HomeService from "../services/home.service";

class HomeController {
  async home(req: Request, res: Response) {
    const userId = req.user?.id ?? null;

    const data = await HomeService.getHome(userId);

    return res.status(200).json({
      success: true,
      message: "Home data fetched successfully.",
      data,
    });
  }
}

export default new HomeController();