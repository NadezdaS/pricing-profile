import { Router } from 'express';
import {
  createPricingProfile,
  getAllPricingProfiles,
  getPricingProfileById
} from '../controllers/pricingProfilesController';

const profilesRouter = Router();

/**
 * @openapi
 * /pricing-profiles:
 *   post:
 *     summary: Create a new pricing profile
 *     tags:
 *       - Pricing Profiles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - basePriceSource
 *               - adjustment
 *               - adjustmentMode
 *               - adjustmentDirection
 *               - productIds
 *             properties:
 *               basePriceSource:
 *                 type: string
 *                 example: Global wholesale price
 *               adjustment:
 *                 type: number
 *                 example: 10
 *               adjustmentMode:
 *                 type: string
 *                 enum: [fixed, percentage]
 *                 example: fixed
 *               adjustmentDirection:
 *                 type: string
 *                 enum: [increase, decrease]
 *                 example: decrease
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["2", "3"]
 *     responses:
 *       200:
 *         description: Pricing profile created successfully
 */
profilesRouter.post('/', createPricingProfile);

/**
 * @openapi
 * /pricing-profiles:
 *   get:
 *     summary: Get all pricing profiles
 *     tags:
 *       - Pricing Profiles
 *     responses:
 *       200:
 *         description: A list of pricing profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
profilesRouter.get('/', getAllPricingProfiles);

/**
 * @openapi
 * /pricing-profiles/{id}:
 *   get:
 *     summary: Get a pricing profile by ID
 *     tags:
 *       - Pricing Profiles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pricing profile
 *     responses:
 *       200:
 *         description: Pricing profile found
 *       404:
 *         description: Pricing profile not found
 */
profilesRouter.get('/:id', getPricingProfileById);

export default profilesRouter;
