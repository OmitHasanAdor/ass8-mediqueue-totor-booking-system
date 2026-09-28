"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const LoginClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const loadingToast = toast.loading("Logging in...");

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
    });

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message || "Login failed");
    } else {
      toast.success("Login successful!");

      // role onujayi redirect
      const role = data?.user?.role || "student";

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "tutor") {
        router.push("/dashboard/tutor");
      } else {
        router.push("/dashboard/student");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
            Login to continue your learning journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-6 sm:p-8">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Email */}
            <TextField isRequired name="email" type="email">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <Input placeholder="Enter your email" className="rounded-lg" />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input placeholder="Enter your password" className="rounded-lg" />
              <div className="flex justify-end mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#4f39f6] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full rounded-lg bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-semibold py-2.5 flex items-center justify-center gap-2 transition-all hover:opacity-90"
            >
              <Check className="w-4 h-4" />
              Login to Account
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-t border-gray-200 dark:border-gray-800" />
            <span className="text-xs text-gray-400 whitespace-nowrap">
              OR CONTINUE WITH
            </span>
            <hr className="flex-1 border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="text-red-500" />
            Sign In with Google
          </Button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#4f39f6] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginClient;