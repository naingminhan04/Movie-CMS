import { useState } from "react";
import { toast } from "react-hot-toast";

import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import OtpVerificationForm from "./components/OtpVerificationForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

type Step = "login" | "forgotPassword" | "otpVerification" | "resetPassword";

const AuthPage = () => {
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleForgotPasswordNext = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("otpVerification");
  };

  const handleOtpNext = (token: string) => {
    setResetToken(token);
    setStep("resetPassword");
  };

  const handleResetDone = () => {
    setStep("login");
    setEmail("");
    setResetToken("");
    toast.success(
      "Successful Password Reset — You can now use your new password to login.",
    );
  };

  return (
    <AuthLayout>
      {step === "login" && (
        <>
          <h2 className="mb-6 text-3xl tracking-wide font-bold text-black">
            Welcome back!
          </h2>
          <LoginForm onForgotPassword={() => setStep("forgotPassword")} />
        </>
      )}

      {step === "forgotPassword" && (
        <ForgotPasswordForm
          onBack={() => setStep("login")}
          onNext={handleForgotPasswordNext}
        />
      )}

      {step === "otpVerification" && (
        <OtpVerificationForm
          email={email}
          onBack={() => setStep("forgotPassword")}
          onNext={handleOtpNext}
        />
      )}

      {step === "resetPassword" && (
        <ResetPasswordForm
          resetToken={resetToken}
          onBack={() => setStep("otpVerification")}
          onDone={handleResetDone}
        />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
