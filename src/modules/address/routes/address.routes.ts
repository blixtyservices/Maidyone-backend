import { Router } from "express";
import AddressController from "../controllers/address.controller";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Addresses
 *   description: User Address APIs
 */

/**
 * @openapi
 * /api/addresses:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get all addresses
 *     description: Returns all addresses of the logged-in user.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Addresses fetched successfully.
 */
router.get("/", AddressController.getAll);

/**
 * @openapi
 * /api/addresses/{id}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address fetched successfully.
 *       404:
 *         description: Address not found.
 */
router.get("/:id", AddressController.getById);

/**
 * @openapi
 * /api/addresses:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Create a new address
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - houseNo
 *               - area
 *               - city
 *               - state
 *               - pincode
 *               - addressType
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               houseNo:
 *                 type: string
 *               area:
 *                 type: string
 *               landmark:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               addressType:
 *                 type: string
 *                 enum:
 *                   - HOME
 *                   - WORK
 *                   - OTHER
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Address created successfully.
 */
router.post("/", AddressController.create);

/**
 * @openapi
 * /api/addresses/{id}:
 *   put:
 *     tags:
 *       - Addresses
 *     summary: Update address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Address updated successfully.
 */
router.put("/:id", AddressController.update);

/**
 * @openapi
 * /api/addresses/{id}:
 *   delete:
 *     tags:
 *       - Addresses
 *     summary: Delete address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully.
 */
router.delete("/:id", AddressController.delete);

/**
 * @openapi
 * /api/addresses/{id}/default:
 *   patch:
 *     tags:
 *       - Addresses
 *     summary: Set default address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Default address updated successfully.
 */
router.patch("/:id/default", AddressController.setDefault);

export default router;