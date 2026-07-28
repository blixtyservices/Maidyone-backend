import { Router } from "express";
import bannerController from "../controllers/banner.controller";
import upload from "../../../middleware/upload";

const router = Router();

router.get("/", bannerController.getAll);

router.get("/:id", bannerController.getById);

router.post(
  "/",
  upload.single("image"),
  bannerController.create
);

router.put("/:id", bannerController.update);

router.delete("/:id", bannerController.delete);

export default router;