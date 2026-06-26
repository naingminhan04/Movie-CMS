import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import OtpVerificationForm from "./components/OtpVerificationForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

type Step = "login" | "forgotPassword" | "otpVerification" | "resetPassword";

const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return `****${local.slice(-2)}@${domain}`;
};

const STEP_META: Record<
  Step,
  { title: string; subtitle?: string }
> = {
  login: {
    title: "Welcome back!",
  },
  forgotPassword: {
    title: "Forgot Your Password",
    subtitle: "We'll send you the update instruction shortly.",
  },
  otpVerification: {
    title: "OTP Verification",
    subtitle: "We have sent an OTP code to your email",
  },
  resetPassword: {
    title: "Reset Password",
  },
};

const BACK_STEP: Partial<Record<Step, Step>> = {
  forgotPassword: "login",
  otpVerification: "forgotPassword",
  resetPassword: "otpVerification",
};

const AuthPage = () => {
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const meta = STEP_META[step];
  const backStep = BACK_STEP[step];

  const handleForgotPasswordNext = (submittedEmail: string, submittedUserId: string) => {
    setEmail(submittedEmail);
    setUserId(submittedUserId);
    setStep("otpVerification");
  };

  const handleOtpNext = (token: string) => {
    setAccessToken(token);
    setStep("resetPassword");
  };

  const handleResetDone = () => {
    setStep("login");
    setEmail("");
    setUserId("");
    setAccessToken("");
    toast.success(
      "Successful Password Reset — You can now use your new password to login.",
    );
  };

  return (
    <AuthLayout>
      {/* Back button row — always reserves the same height so the title never shifts */}
      <div className="mb-4 h-6">
        {backStep && (
          <button
            type="button"
            onClick={() => setStep(backStep)}
            className="flex items-center gap-2 text-gray-500 transition hover:text-gray-700"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </button>
        )}
      </div>

      {/* Title — always at the same vertical position */}
      <h2 className="mb-1 text-3xl tracking-wide font-bold text-black">
        {meta.title}
      </h2>

      {/* Subtitle */}
      {meta.subtitle && (
        <p className="mb-1 text-sm text-gray-500">{meta.subtitle}</p>
      )}

      {/* Masked email shown only on OTP step */}
      {step === "otpVerification" && email && (
        <p className="mb-4 text-sm font-medium text-gray-700">
          {maskEmail(email)}
        </p>
      )}

      {/* Extra spacing for steps without subtitle */}
      {!meta.subtitle && <div className="mb-4" />}

      {/* Form content */}
      {step === "login" && (
        <LoginForm onForgotPassword={() => setStep("forgotPassword")} />
      )}
      {step === "forgotPassword" && (
        <ForgotPasswordForm onNext={handleForgotPasswordNext} />
      )}
      {step === "otpVerification" && (
        <OtpVerificationForm userId={userId} onNext={handleOtpNext} />
      )}
      {step === "resetPassword" && (
        <ResetPasswordForm accessToken={accessToken} onDone={handleResetDone} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
