import { Product, Category } from '../models';
import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

type IdParams = {
  id: string;
};

// GET /products (+ filter)
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.query;

    let products;

    if (categoryId) {
      products = await Product.find({ categoryId });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// GET /products/:id
export const getProductById = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.body;

    // 🔥 CATEGORY CHECK (FR016)
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid categoryId' });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: 'Category does not exist' });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT /products/:id
export const updateProduct = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    if (req.body.categoryId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
        return res.status(400).json({ message: 'Invalid categoryId' });
      }

      const category = await Category.findById(req.body.categoryId);

      if (!category) {
        return res.status(400).json({ message: 'Category does not exist' });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE /products/:id
export const deleteProduct = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
