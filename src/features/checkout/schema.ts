import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  address: z.string().trim().min(5, "Enter your address"),
  city: z.string().trim().min(2, "Enter your city"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
