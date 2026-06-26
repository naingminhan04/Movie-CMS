import { useState, useEffect, type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

  const [isLoaded, setLoaded] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowText((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  return (
    <main className="flex h-220 bg-[#232B73] relative overflow-hidden">
      {/* Left side */}
      <section className="flex w-full flex-col px-52 py-18 text-white">
        <div className="flex mb-32 items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#232B73] text-4xl font-bold relative z-10">
            O
          </div>
          <span
            className={`ml-2 mb-3 text-4xl tracking-wide font-medium transition-all duration-700 ease-in-out ${
              showText
                ? "-translate-x-16 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            rigin
          </span>
        </div>

        <div className="max-w-xl">
          <h1 className="mb-10 text-5xl font-bold tracking-wide leading-15">
            Manage
            <br />
            Everything in One
            <br />
            Place
          </h1>
          <p className="max-w-lg text-md leading-6 text-white/90">
            Sign in to access your dashboard and manage your data, monitor
            activity, and stay in control of your workspace.
          </p>
        </div>
      </section>

      {/* Right side */}
      <section
        className={`flex absolute h-full w-[42%] min-w-150 items-start justify-center rounded-l-[56px] bg-white overflow-y-auto ${
          isLoaded
            ? "right-0 transition-all duration-500"
            : "-right-160"
        }`}
      >
        <div className="w-full max-w-130 px-12 pt-56">{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
