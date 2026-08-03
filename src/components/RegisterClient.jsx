"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const RegisterClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const loadingToast = toast.loading("Creating your account...");

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.photo,
    });

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Redirecting...");
      router.push(callbackUrl);
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
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
            Start your adventure with MediQueue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-6 sm:p-8">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

            {/* Full Name */}
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input placeholder="Enter your name" className="rounded-lg" />
              <FieldError />
            </TextField>

            {/* Email Address */}
            <TextField isRequired name="email" type="email">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
              <Input placeholder="Enter your email" className="rounded-lg" />
              <FieldError />
            </TextField>

            {/* Photo URL */}
            <TextField isRequired name="photo" type="url">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Photo URL</Label>
              <Input placeholder="Enter your photo URL" className="rounded-lg" />
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
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
              <Input placeholder="Create a password" className="rounded-lg" />
              <Description className="text-xs text-gray-400">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 flex items-center justify-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              Create Account
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-t border-gray-200 dark:border-gray-800" />
            <span className="text-xs text-gray-400 whitespace-nowrap">OR REGISTER WITH</span>
            <hr className="flex-1 border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="text-red-500" />
            Register with Google
          </Button>

          {/* Footer link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-cyan-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;