import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Password and confirm password does't match"),
});

export const verifyEmailSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    otp: Yup.string().required("OTP is required")
}); 

export const loginSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    password: Yup.string().required("Password is required")
}); 

export const resetPasswordConfirm = Yup.object({
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Password and confirm password does't match")
}); 

export const changePasswordSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Password and confirm password does't match")
}); 

export const resetPasswordLink = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email")
}); 