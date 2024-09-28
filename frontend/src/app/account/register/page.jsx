"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { registerSchema } from "@/validation/schemas";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";  // Corrected from "next/navigation" to "next/router"
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import LayoutAuth from "@/components/ui/layoutauth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

const Register = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      console.log("sending data to backend: ", values);
      setloading(true);
      try {
        const response = await axios.post(`${BASE_URL}/register`, values);
        console.log("Response is : ", response);

        if (response.data && response.status === 201) {
          toast.success(response.data.message);
          setloading(false);
          router.push("/account/verify-email");
          actions.resetForm();
        };

      } catch (error) {
        console.error('Api failed ', error.response);
        toast.error("Email already exists");
        setloading(false);
      }
    }
  });

  useEffect(() => {
    toast.dismiss(); // Clears any previous toasts when the component loads
  }, []);

  return (
    <>
    <div>
    <Toaster />

    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenue à Inceptum
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Connectez-vous à Inceptum, même si nous n avons pas encore un flux de connexion complet.
      </p>
      <form className="my-8" onSubmit={formik.handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} placeholder="John Doe" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Adresse Email</Label>
          <Input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} placeholder="votreadresse@mail.com" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} placeholder="••••••••" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
          <Input id="password_confirmation" name="password_confirmation" type="password" onChange={formik.handleChange} value={formik.values.password_confirmation} placeholder="••••••••" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow"
          type="submit"
          disabled={loading}
        >
          S inscrire &rarr;
        </button>

        <div className="items-center justify-between text-sm text-neutral-700 dark:text-neutral-400 mt-6">
          <a href="/account/login" className="hover:underline">
            Déjà un compte ? Se connecter
          </a>
        </div>
      </form>
    </div>
  </div>
  </>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Register;
