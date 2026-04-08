import { Category } from '../models';
import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
// GET /categories
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// GET /categories/:id
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ✅ ID VALIDATION
    if (
      !req.params.id ||
      typeof req.params.id !== 'string' ||
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

// POST /categories
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// PUT /categories/:id
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ✅ ID VALIDATION
    if (
      !req.params.id ||
      typeof req.params.id !== 'string' ||
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

// DELETE /categories/:id
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ✅ ID VALIDATION
    if (
      !req.params.id ||
      typeof req.params.id !== 'string' ||
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
