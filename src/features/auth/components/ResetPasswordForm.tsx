import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { resetPassword } from "../api/auth.api";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../schema/resetPassword.schema";
import { getErrorMessage } from "@/lib/get-error-message";

interface Props {
  accessToken: string;
  onDone: () => void;
}

const ResetPasswordForm = ({ accessToken, onDone }: Props) => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async ({ newPassword }: ResetPasswordSchema) => {
    try {
      const res = await resetPassword({ accessToken, newPassword });
      toast.success(res.message || "Password reset successfully");
      onDone();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-5">
      <div>
        <label className="mb-2 block text-sm text-gray-500">New Password</label>
        <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-100 px-4">
          <input
            type={showNew ? "text" : "password"}
            placeholder="••••••"
            className="flex-1 bg-transparent outline-none"
            {...register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-500">Confirm Password</label>
        <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-100 px-4">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••"
            className="flex-1 bg-transparent outline-none"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 items-center rounded-xl bg-[#232B73] px-6 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
