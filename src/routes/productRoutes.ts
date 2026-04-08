import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';

import { validate } from '../middleware/validate';
import { productSchema } from '../schema/productSchema';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 */
router.get('/', getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create product
 */
router.post('/', validate(productSchema), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 */
router.put('/:id', validate(productSchema), updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 */
router.delete('/:id', deleteProduct);

export default router;
