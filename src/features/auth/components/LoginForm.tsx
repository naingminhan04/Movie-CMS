import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../api/auth.api";
import { getUserProfile } from "../api/profile.api";
import { ROUTES } from "@/routes/path";

import {
  clearRememberedEmail,
  getRememberedEmail,
  setRememberedEmail,
} from "../lib/remember-email";
import { loginSchema, type LoginSchema } from "../schema/login.scheme";
import { useAuthStore } from "../store/auth.store";

const rememberedEmail = getRememberedEmail();

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail ?? "",
      remember: Boolean(rememberedEmail),
    },
  });

  const onSubmit = async ({ email, password, remember }: LoginSchema) => {
    try {
      const res = await adminLogin({ email, password });

      if (remember) {
        setRememberedEmail(email);
      } else {
        clearRememberedEmail();
      }

      setAuth(res.data);

      try {
        const profile = await getUserProfile();
        setUser(profile.data);
      } catch {
        // MainLayout will retry profile loading.
      }

      toast.success(res.message);
      navigate(ROUTES.dashboard);
    } catch (err) {
      toast.error("Login failed: " + err);
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
        </div>

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-500">Password</label>

        <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-100 px-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••"
            className="flex-1 bg-transparent outline-none"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input className="h-4 w-4" type="checkbox" {...register("remember")} />
          <span className="text-lg">Remember</span>
        </label>

        <button type="button" className="font-medium text-[#0D4D87]">
          Forgot password?
        </button>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-30 items-center gap-5 rounded-xl bg-[#232B73] px-4 text-lg font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Loading..." : "Login"}
          <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
