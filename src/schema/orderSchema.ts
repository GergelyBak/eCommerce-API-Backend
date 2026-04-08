import { z } from 'zod';

export const orderSchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    }),
  ),
});
