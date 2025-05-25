import { Router } from 'express';
import {
  createPricingProfile,
  getAllPricingProfiles,
  getPricingProfileById,
  updatePricingProfileById,
  deletePricingProfileById
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
 *               - adjustmentMode
 *               - adjustmentDirection
 *               - productIds
 *               - productAdjustments
 *             properties:
 *               basePriceSource:
 *                 type: string
 *                 example: Global wholesale price
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
 *               productAdjustments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     adjustment:
 *                       type: number
 *                 example: [{ productId: "2", adjustment: 15 }]
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

/**
 * @openapi
 * /pricing-profiles/{id}:
 *   patch:
 *     summary: Partially update a pricing profile
 *     tags:
 *       - Pricing Profiles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               basePriceSource:
 *                 type: string
 *               adjustmentMode:
 *                 type: string
 *                 enum: [fixed, percentage]
 *               adjustmentDirection:
 *                 type: string
 *                 enum: [increase, decrease]
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               replaceAdjustments:
 *                 type: boolean
 *                 description: Whether to replace existing adjustments
 *                 example: true
 *               productAdjustments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     adjustment:
 *                       type: number
 *     responses:
 *       200:
 *         description: Pricing profile updated
 *       404:
 *         description: Pricing profile not found
 */
profilesRouter.patch('/:id', updatePricingProfileById);

/**
 * @openapi
 * /pricing-profiles/{id}:
 *   delete:
 *     summary: Delete a pricing profile
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
 *       204:
 *         description: Pricing profile deleted successfully
 *       404:
 *         description: Pricing profile not found
 */
profilesRouter.delete('/:id', deletePricingProfileById);

export default profilesRouter;
