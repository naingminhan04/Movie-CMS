import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgetPasswordSchema, type ForgetPasswordSchema} from "../schema/fogetPassword.scheme"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgetPasswordSchema) => {
    try {
      const res = await forgetPassword({ email });
      toast.success(res.message);
      navigate("/otp");
    } catch (err) {
      toast.error("Otp request failed: " + err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <div>
        <label>
          Email Address
        </label>

        <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-100 px-4">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-transparent outline-none"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-30 items-center gap-5 rounded-xl bg-[#232B73] px-4 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </form>
  )
}

export default ForgetPasswordForm
