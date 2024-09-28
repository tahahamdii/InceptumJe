"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { verifyEmailSchema } from "@/validation/schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

const initialValues = {
  email: "",
  otp: "",
};

const VerifyEmail = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema: verifyEmailSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(`${BASE_URL}/verify-email`, values);
        console.log("Response is: ", response);

        if (response.data && response.status === 200) {
          toast.success(response.data.message);
          router.push("/account/login");
          actions.resetForm();
        }
      } catch (error) {
        console.error("API failed: ", error.response);
        if (error.response?.status === 400 || error.response?.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    },
  });

  useEffect(() => {
    toast.dismiss(); // Clears any previous toasts when the component loads
  }, []);

  return (
    <div>
      <Toaster />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify Your Email
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your email and the OTP sent to you to verify your account.
        </p>
        <form onSubmit={formik.handleSubmit} className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.errors.email && (
              <div className="text-sm text-red-500 px-2 mt-1">
                {formik.errors.email}
              </div>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.otp}
              placeholder="Enter OTP"
            />
            {formik.errors.otp && (
              <div className="text-sm text-red-500 px-2 mt-1">
                {formik.errors.otp}
              </div>
            )}
          </LabelInputContainer>

          <div className="block text-sm mt-6">
            Already have an account?{" "}
            <Link href="/account/login">
              <span className="text-blue-500 cursor-pointer">Login</span>
            </Link>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow mt-4"
            disabled={formik.isSubmitting}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => (
  <div className={`flex flex-col space-y-2 w-full ${className}`}>
    {children}
  </div>
);

export default VerifyEmail;
