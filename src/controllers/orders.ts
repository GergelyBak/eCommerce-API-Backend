import { Order, User, Product } from '../models';
import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

type IdParams = {
  id: string;
};

// GET /orders
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// GET /orders/:id
export const getOrderById = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// POST /orders
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, products } = req.body;

    // 🔥 USER CHECK
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // 🔥 PRODUCTS CHECK + TOTAL
    let total = 0;

    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: 'Invalid productId' });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }

      if (product.price === null || product.price === undefined) {
        return res.status(400).json({ message: 'Product price is invalid' });
      }

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// PUT /orders/:id
export const updateOrder = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const { userId, products } = req.body;

    // USER CHECK
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    let total = 0;

    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: 'Invalid productId' });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }

      if (product.price === null || product.price === undefined) {
        return res.status(400).json({ message: 'Product price is invalid' });
      }

      total += product.price * item.quantity;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { userId, products, total },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// DELETE /orders/:id
export const deleteOrder = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
};
