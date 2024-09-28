"use client"
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { loginSchema } from "@/validation/schemas";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from 'react-hot-toast';
import { SignupFormDemo } from "@/components/ui/signupform";
import  LoginForm  from "@/components/ui/signinform";
import LayoutAuth from "@/components/ui/layoutauth";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";


const initialValues = {
  
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/login`, values, { withCredentials: true });
        console.log("Response is: ", response);

        if (response.data && response.status === 200) {
          toast.success(response.data.message);
          setLoading(false);
          router.push("/user/dashboard");
          actions.resetForm();
        };
      } catch (error) {
        console.error("API failed: ", error.response);
        toast.error(error.response?.data?.message || "Login failed");
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    toast.dismiss();  // Clears any previous toasts when the component loads
  }, []);

  return (
    <>
    <div>
      <Toaster />
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
        <div className="flex justify-between items-center mt-5 text-sm">
          <a
            href="/account/reset-password-link"
            className="text-zink-600 dark:text-white hover:underline"
          >
            Mot de passe oublié ?
          </a>
          <a
            href="/account/register"
            className="text-zinc-600 dark:text-white hover:underline"
          >
            Créer un compte
          </a>
        </div>
      </div>
    </div>
    </>
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


export default Login