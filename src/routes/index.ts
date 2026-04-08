import { Router } from 'express';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';

const router = Router();
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
export default router;
