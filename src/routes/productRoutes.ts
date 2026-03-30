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

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', validate(productSchema), createProduct);
router.put('/:id', validate(productSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
