import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categorys';

import { validate } from '../middleware/validate';
import { categorySchema } from '../schema/categoryschema';

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 */
router.post('/', validate(categorySchema), createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 */
router.put('/:id', validate(categorySchema), updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 */
router.delete('/:id', deleteCategory);

export default router;
