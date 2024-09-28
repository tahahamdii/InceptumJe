"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { resetPasswordLink } from "@/validation/schemas";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import LayoutAuth from "@/components/ui/layoutauth";

const initialValues = {
  email: "",
};

const ResetPasswordLink = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordLink,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/reset-password-link`,
          values
        );
        console.log("Response is: ", response);

        if (response.data && response.status === 200) {
          toast.success(response.data.message);
          actions.resetForm();
        }
      } catch (error) {
        console.error("API failed ", error.response);
        if (error.response?.status === 400) {
          toast.error("Email doesn't exist");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <>
    <div>
      <Toaster />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Reset Password Link
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={formik.handleSubmit} className="my-8">
          <LabelInputContainer className="mb-8">
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

          <div className="block text-sm mt-6">
            Don t have an account?{" "}
            <Link href="/account/register">
              <span className="text-blue-500 cursor-pointer">Register here</span>
            </Link>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow mt-4"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? "Sending Email..." : "Send"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

const LabelInputContainer = ({ children, className }) => (
  <div className={`flex flex-col space-y-2 w-full ${className}`}>
    {children}
  </div>
);

export default ResetPasswordLink;
