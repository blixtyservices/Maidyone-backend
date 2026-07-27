import { Router } from "express";
import AddressController from "../controllers/address.controller";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Addresses
 *   description: User Address Management APIs
 */

/**
 * @openapi
 * /addresses:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get All Addresses
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
 * /addresses/{id}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get Address By ID
 *     description: Returns a single address of the logged-in user.
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
 * /addresses:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Create Address
 *     description: Create a new address for the logged-in user.
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
 *               - label
 *               - type
 *               - houseNumber
 *               - street
 *               - city
 *               - state
 *               - country
 *               - pincode
 *               - latitude
 *               - longitude
 *             properties:
 *               label:
 *                 type: string
 *                 example: Home
 *
 *               type:
 *                 type: string
 *                 enum:
 *                   - HOME
 *                   - WORK
 *                   - OTHER
 *
 *               houseNumber:
 *                 type: string
 *                 example: "105"
 *
 *               street:
 *                 type: string
 *                 example: Vijay Nagar
 *
 *               landmark:
 *                 type: string
 *                 example: Near C21 Mall
 *
 *               city:
 *                 type: string
 *                 example: Indore
 *
 *               state:
 *                 type: string
 *                 example: Madhya Pradesh
 *
 *               country:
 *                 type: string
 *                 example: India
 *
 *               pincode:
 *                 type: string
 *                 example: "452010"
 *
 *               latitude:
 *                 type: number
 *                 example: 22.7533
 *
 *               longitude:
 *                 type: number
 *                 example: 75.8937
 *
 *               isDefault:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Address created successfully.
 */
router.post("/", AddressController.create);

/**
 * @openapi
 * /addresses/{id}:
 *   put:
 *     tags:
 *       - Addresses
 *     summary: Update Address
 *     description: Update an existing address.
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
 *       404:
 *         description: Address not found.
 */
router.put("/:id", AddressController.update);

/**
 * @openapi
 * /addresses/{id}:
 *   delete:
 *     tags:
 *       - Addresses
 *     summary: Delete Address
 *     description: Delete an existing address.
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
 *       404:
 *         description: Address not found.
 */
router.delete("/:id", AddressController.delete);

/**
 * @openapi
 * /addresses/{id}/default:
 *   patch:
 *     tags:
 *       - Addresses
 *     summary: Set Default Address
 *     description: Mark an address as the default address.
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
 *       404:
 *         description: Address not found.
 */
router.patch("/:id/default", AddressController.setDefault);

export default router;