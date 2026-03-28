import { User } from '../models';
import type { Request, Response, NextFunction } from 'express';

// GET /users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /users
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    // 🔥 duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    next(error);
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    next(error);
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};