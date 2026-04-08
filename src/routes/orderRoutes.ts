import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orders';

import { validate } from '../middleware/validate';
import { orderSchema } from '../schema/orderSchema';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', validate(orderSchema), createOrder);
router.put('/:id', validate(orderSchema), updateOrder);
router.delete('/:id', deleteOrder);

export default router;
