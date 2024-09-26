"use client"
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { verifyEmailSchema } from "@/validation/schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from 'react-hot-toast';

const initialValues = {
  email: "",
  otp: "",
};

const VerifyEmail = () => {
  const router = useRouter();
  const { values, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: verifyEmailSchema,
    onSubmit: async (values,action) =>{
      console.log(values);

      try {
        const response = await axios.post(`${BASE_URL}/verify-email`,values);
        console.log("Response is: ",response);
        
        if(response.data && response.status === 200){
          toast.success(response.data.message);
          router.push("/account/login");
          action.resetForm();
        };

      } catch (error) {
        console.error("Api failed: ",error.response);
        if(error.response.status === 400){
          toast.error(error.response.data.message);
        }
         if(error.response.status === 404){
          toast.error(error.response.data.message);
        }
      }
    }
  });

  useEffect(() => {
    toast.dismiss(); // Clears any previous toasts when the component loads
  }, []);
  
  return (
    <div>
    <Toaster />
    <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-blue-800 to-blue-500 lg:h-screen p-6">

    <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
      <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full h-full">
        <div className="max-w-md space-y-12 mx-auto">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
            <p className="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
          </div>
        </div>
      </div>

      <form className="sm:p-8 p-4 w-full" onSubmit={handleSubmit}>
        <div className="mb-12">
          <h3 className="text-blue-500 text-3xl font-extrabold max-md:text-center">Verify Email</h3>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
            <input name="email" value={values.email} onChange={handleChange} type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />

            {errors.email && <div className="text-sm text-red-500 px-2 mt-1">{errors.email}</div>}
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">OTP</label>
            <input name="otp" value={values.otp} onChange={handleChange} type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />

            {errors.otp && <div className="text-sm text-red-500 px-2 mt-1">{errors.otp}</div>}
          </div>
        </div>

        <div className="block text-sm mt-6">
            Already have an account?
            <Link href="/account/login">
              <span className="text-blue-500 cursor-pointer"> Login</span>
            </Link>
          </div>

        <div className="mt-3 flex items-center justify-center">
          <button type="submit" className="py-3 px-6 w-full text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
            Verify
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  )
}

export default VerifyEmail;