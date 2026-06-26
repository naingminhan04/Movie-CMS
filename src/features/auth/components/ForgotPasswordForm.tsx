import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../api/auth.api";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schema/forgotPassword.schema";
import { ROUTES } from "@/routes/path";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgotPasswordSchema) => {
    try {
      const res = await forgotPassword({ email, userType: "ADMIN" });
      toast.success(res.message);
      navigate(ROUTES.otpVerification, { state: { email } });
    } catch (err) {
      toast.error("Failed to send OTP: " + err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <button
        type="button"
        onClick={() => navigate(ROUTES.login)}
        className="mb-6 flex items-center gap-2 text-gray-500 transition hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide text-black">
          Forgot Your Password
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          We'll send you the update instruction shortly.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-500">
          Email Address
        </label>

        <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-100 px-4">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-transparent outline-none"
            {...register("email")}
          />
          <span className="text-xs text-gray-400">@company.com.mm</span>
        </div>

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 items-center rounded-xl bg-[#232B73] px-6 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
