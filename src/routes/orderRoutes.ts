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

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 */
router.get('/', getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 */
router.post('/', validate(orderSchema), createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 */
router.put('/:id', validate(orderSchema), updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 */
router.delete('/:id', deleteOrder);

export default router;
