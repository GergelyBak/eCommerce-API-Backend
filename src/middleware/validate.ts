import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.issues, // 🔥 EZ FONTOS!
      });
    }
  };
