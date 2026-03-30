import { Router } from 'express';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import productRoutes from './productRoutes';

const router = Router();
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

export default router;
