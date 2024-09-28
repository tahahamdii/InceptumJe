"use client";
import React from "react";
import { useFormik } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast from 'react-hot-toast';
import { loginSchema } from "@/validation/schemas";


const LoginForm = ({ onLoginSuccess }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema, // Ensure you have imported this schema or define it as needed
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, values, { withCredentials: true });
        toast.success(response.data.message);
        onLoginSuccess();
        actions.resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Bienvenue à Inceptum</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Connectez-vous à votre compte !</p>
      <form onSubmit={formik.handleSubmit} className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="votreemail@exemple.com"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="••••••••"
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow"
          disabled={formik.isSubmitting}
        >
          Se connecter &rarr;
        </button>
      </form>
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
    </>
  );
};
const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);

export default LoginForm;
