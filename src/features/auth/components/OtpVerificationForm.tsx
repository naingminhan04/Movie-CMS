import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { verifyOtp } from "../api/auth.api";
import {
  otpVerificationSchema,
  type OtpVerificationSchema,
} from "../schema/otpVerification.schema";
import { getErrorMessage } from "@/lib/get-error-message";

interface Props {
  userId: string;
  onNext: (accessToken: string) => void;
}

const OTP_LENGTH = 6;

const OtpVerificationForm = ({ userId, onNext }: Props) => {
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
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    setValue("otp", pasted, { shouldValidate: true });
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const onSubmit = async ({ otp: otpCode }: OtpVerificationSchema) => {
    try {
      const res = await verifyOtp({ userId, code: otpCode });
      toast.success(res.message);
      onNext(res.data.accessToken);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <div>
        <label className="mb-2 block text-sm text-gray-500">OTP Code</label>

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
