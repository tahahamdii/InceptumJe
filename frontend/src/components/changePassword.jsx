"use client"

import { changePasswordSchema } from "@/validation/schemas";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

const initialValues = {
    password: "",
    password_confirmation:"",
  };

const ChangePassword = () => {
  const [loading, setloading] = useState(false);


    const { values, errors, handleChange, handleSubmit} = useFormik({
        initialValues,
        validationSchema: changePasswordSchema,
        onSubmit: async (values,action) =>{
          console.log(values);

          setloading(true);
          try {
            const response = await axios.post(`${BASE_URL}/change-password`,values);
            console.log("Response is : ",response);
    
            if(response.data && response.status === 200){
              toast.success(response.data.message);
              setloading(false);
              action.resetForm();
            };
    
          } catch (error) {
            console.error('Api failed ',error.response);
            if(error.response.status === 400){
              toast.error("Password and Confirm Password are not same")
              setloading(false);
            }
            setloading(false);
          }

        }
      }); 
  return (
    <div>
      <Toaster />
        <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <a href="javascript:void(0)"><img
              src="https://readymadeui.com/readymadeui-white.svg" alt="logo" className='w-52 mb-12 inline-block' />
            </a>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-white">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
           
          </div>

          <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
            <h3 className="text-3xl font-extrabold mb-12">
             Change Password
            </h3>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" value={values.password} onChange={handleChange} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />

              {errors.password && <div className="text-sm text-red-500 px-2 mt-1">{errors.password}</div>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="password_confirmation" value={values.password_confirmation} onChange={handleChange} type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" />

              {errors.password_confirmation && <div className="text-sm text-red-500 px-2 mt-1">{errors.password_confirmation}</div>}
            </div>
            <div>
              <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
                Log in
              </button> 
            </div>
            
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword;