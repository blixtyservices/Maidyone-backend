import { Router } from "express";

import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../../../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /auth/health:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Authentication Health Check
 *     responses:
 *       200:
 *         description: Authentication module is working
 */
router.get("/health", AuthController.health);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", AuthController.signup);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "Password@123"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", AuthController.login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get Logged-in User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user profile
 */
router.get(
  "/me",
  AuthMiddleware.authenticate,
  AuthController.me
);

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Generate New Access Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 */
router.post(
  "/refresh-token",
  AuthController.refreshToken
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
  "/logout",
  AuthMiddleware.authenticate,
  AuthController.logout
);

/**
 * @openapi
 * /auth/send-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Send OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - purpose
 *             properties:
 *               phone:
 *                 type: string
 *               purpose:
 *                 type: string
 *                 enum:
 *                   - LOGIN
 *                   - SIGNUP
 *                   - FORGOT_PASSWORD
 *                   - VERIFY_PHONE
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post(
  "/send-otp",
  AuthController.sendOtp
);

/**
 * @openapi
 * /auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - code
 *               - purpose
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *               purpose:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post(
  "/verify-otp",
  AuthController.verifyOtp
);

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Forgot Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post(
  "/forgot-password",
  AuthController.forgotPassword
);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - code
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post(
  "/reset-password",
  AuthController.resetPassword
);

export default router;  