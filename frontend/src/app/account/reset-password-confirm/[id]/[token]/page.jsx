"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { resetPasswordConfirm } from "@/validation/schemas";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";

const initialValues = {
  password: "",
  password_confirmation: "",
};

const ResetPasswordConfirm = () => {
  const { id, token } = useParams(); // Corrected to useParams to fetch id and token
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordConfirm,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/reset-password/${id}/${token}`, // Correct URL structure
          values
        );
        console.log(
          `Sending request to: ${BASE_URL}/reset-password/${id}/${token}`,
          values
        );

        if (response.data && response.status === 200) {
          toast.success(response.data.message);
          router.push("/account/login");
          actions.resetForm();
        }
      } catch (error) {
        toast.error(
          error.response?.status === 404
            ? "User not found"
            : error.response?.data?.message || "Reset failed"
        );
        console.log("API failed: ", error.response); // Logging error for insights
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <div>
      <Toaster />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Reset Your Password
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please enter your new password below.
        </p>
        <form onSubmit={formik.handleSubmit} className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="••••••••"
            />
            {formik.errors.password && (
              <div className="text-sm text-red-500 px-2 mt-1">
                {formik.errors.password}
              </div>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="password_confirmation">
              Confirm New Password
            </Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              placeholder="••••••••"
            />
            {formik.errors.password_confirmation && (
              <div className="text-sm text-red-500 px-2 mt-1">
                {formik.errors.password_confirmation}
              </div>
            )}
          </LabelInputContainer>

          <button
            type="submit"
            className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow"
            disabled={loading || formik.isSubmitting}
          >
            Reset Password &rarr;
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

export default ResetPasswordConfirm;
