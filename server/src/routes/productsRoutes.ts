import { Router } from 'express';
import { getFilteredProducts, getProductById } from '../controllers/productsController';

const productsRouter = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get products with optional filters
 *     tags:
 *       - Products
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: subCategory
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: segment
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: brand
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
productsRouter.get('/', getFilteredProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Product not found
 */
productsRouter.get('/:id', getProductById);

export default productsRouter;
