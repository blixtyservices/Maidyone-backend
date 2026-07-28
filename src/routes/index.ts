import { Router } from "express";

import authRoutes from "../modules/auth/routes/auth.routes";
import profileRoutes from "../modules/profile/routes/profile.routes";
import homeRoutes from "../modules/home/routes/home.routes";
import categoryRoutes from "../modules/category/routes/category.routes";
import serviceRoutes from "../modules/service/routes/service.routes";
import addressRoutes from "../modules/address/routes/address.routes";
import bookingRoutes from "../modules/booking/routes/booking.routes";
import paymentRoutes from "../modules/payment/routes/payment.routes";
import couponRoutes from "../modules/coupon/routes/coupon.routes";
import notificationRoutes from "../modules/notification/routes/notification.routes";
import bannerRoutes from "../modules/banner/routes/banner.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/home", homeRoutes);
router.use("/categories", categoryRoutes);
router.use("/services", serviceRoutes);
router.use("/addresses", addressRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/coupons", couponRoutes);
router.use("/notifications", notificationRoutes);
router.use("/banners", bannerRoutes);

export default router;