import { z } from "zod";

export const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email"),
    userType: "ADMIN"
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;