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
import { LoginForm } from "@/components/ui/signinform";
import LayoutAuth from "@/components/ui/layoutauth";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const { values, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values,action) =>{
      console.log(values);
      setloading(true)
      try {
        const response = await axios.post(`${BASE_URL}/login`,values,{withCredentials:true});
        console.log("Response is: ",response);
        
        if(response.data && response.status === 200){
          toast.success(response.data.message);
          setloading(false)
          router.push("/user/dashboard");
          action.resetForm();
        };

      } catch (error) {
        console.error("Api failed: ",error.response);
        if(error.response.status === 400){
          toast.error(error.response.data.message);
          setloading(false)
        }
         if(error.response.status === 404){
          toast.error(error.response.data.message);
          setloading(false)
        }
         if(error.response.status === 401){
          toast.error(error.response.data.message);
          setloading(false)
        }
        setloading(false)
      }
    }
  });

  useEffect(() => {
    toast.dismiss(); // Clears any previous toasts when the component loads
  }, []);

  return (
    <div>
    <Toaster />
    <LayoutAuth>
    <LoginForm/>
    </LayoutAuth>
  </div>
  )
}

export default Login