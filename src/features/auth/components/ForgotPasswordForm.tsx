import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { forgotPassword } from "../api/auth.api";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schema/forgotPassword.schema";
import { getErrorMessage } from "@/lib/get-error-message";

interface Props {
  onNext: (email: string, userId: string) => void;
}

const ForgotPasswordForm = ({ onNext }: Props) => {
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
      onNext(email, res.data.userId);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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
