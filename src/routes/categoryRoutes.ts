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

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', validate(categorySchema), createCategory);
router.put('/:id', validate(categorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
