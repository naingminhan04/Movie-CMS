import { z } from "zod";

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>;
