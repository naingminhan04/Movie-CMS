import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import { verifyOtp } from "../api/auth.api";
import {
  otpVerificationSchema,
  type OtpVerificationSchema,
} from "../schema/otpVerification.schema";
import { ROUTES } from "@/routes/path";

/** Mask an email address: "admin@company.com.mm" → "****in@company.com.mm" */
const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(-2);
  const masked = "****" + visible;
  return `${masked}@${domain}`;
};

const OTP_LENGTH = 6;

const OtpVerificationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = location.state?.email ?? "";

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { setValue, handleSubmit, watch, formState: { isSubmitting } } =
    useForm<OtpVerificationSchema>({
      resolver: zodResolver(otpVerificationSchema),
      defaultValues: { otp: "" },
    });

  const otp = watch("otp");
  const digits = otp.padEnd(OTP_LENGTH, "").split("").slice(0, OTP_LENGTH);

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = digits
      .map((d, i) => (i === index ? digit : d))
      .join("")
      .trimEnd();
    setValue("otp", newOtp, { shouldValidate: true });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    setValue("otp", pasted, { shouldValidate: true });
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async ({ otp: otpCode }: OtpVerificationSchema) => {
    try {
      const res = await verifyOtp({ email, otp: otpCode, userType: "ADMIN" });
      toast.success(res.message);
      navigate(ROUTES.resetPassword, {
        state: { resetToken: res.data.resetToken, email },
      });
    } catch (err) {
      toast.error("OTP verification failed: " + err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <button
        type="button"
        onClick={() => navigate(ROUTES.forgotPassword)}
        className="mb-6 flex items-center gap-2 text-gray-500 transition hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide text-black">
          OTP Verification
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          We have sent an OTP code to your email
        </p>
        {email && (
          <p className="text-sm font-medium text-gray-700">{maskEmail(email)}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-500">
          Email Address
        </label>

        <div className="flex gap-3">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[index] ?? ""}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-12 w-12 rounded-xl border border-gray-300 bg-gray-100 text-center text-lg font-semibold outline-none focus:border-[#232B73] focus:ring-2 focus:ring-[#232B73]/20"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting || otp.length < OTP_LENGTH}
          className="flex h-12 items-center rounded-xl bg-[#232B73] px-6 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
