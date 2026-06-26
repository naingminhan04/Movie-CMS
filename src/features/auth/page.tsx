import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

const AuthPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.passwordReset) {
      toast.success("Successful Password Reset — You can now use your new password to login to your account.");
    }
  }, [location.state]);

  return (
    <AuthLayout>
      <h2 className="mb-6 text-3xl tracking-wide font-bold text-black">
        Welcome back!
      </h2>
      <LoginForm />
    </AuthLayout>
  );
};

export default AuthPage;
