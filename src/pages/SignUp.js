import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

let loginschema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Requires email entry"),
  password: yup.string().required("Required to enter password"),
  address: yup.string().required("Required to enter address"),
  phone: yup.string().matches(/^[0-9]{10}$/g, 'Invalid phone number'),
  fullName: yup.string().matches(/^[\p{L}\s\-',.]+$/u, 'Full name is not valid')
});
  
const SignUp = () => {

 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      address: "",
      phone: "",
      fullName: "",
      role:"STORE",
    },
    validationSchema: loginschema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;
 
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Sign Up</h3>
        <p className="text-center">Sign up an account to continue.</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "Email account already exists" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          
          <CustomInput
                 type="text"
                 label="Address"
                 id="address"
                 name="address"
                 onChng={formik.handleChange("address")}
                 onBlr={formik.handleBlur("address")}
                 val={formik.values.address}
               />
               <div className="error mt-2">
                 {formik.touched.address && formik.errors.address}
               </div>
                <CustomInput
                 type="text"
                 label="Full Name"
                 id="fullName"
                 name="fullName"
                 onChng={formik.handleChange("fullName")}
                 onBlr={formik.handleBlur("fullName")}
                 val={formik.values.fullName}
               />
               <div className="error mt-2">
                 {formik.touched.fullName && formik.errors.fullName}
               </div> 
               <CustomInput
                 type="text"
                 label="Phone"
                 id="phone"
                 name="phone"
                 onChng={formik.handleChange("phone")}
               onBlr={formik.handleBlur("phone")}
               val={formik.values.phone}
              />
              <div className="error mt-2">
                {formik.touched.phone && formik.errors.phone}
               </div>
          {/* <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div> */}
         
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Sign Up
          </button>
          {/* <div className="mb-2 text-first">
            Don't have any account?
            <Link to="SignUp" className="">
              Register
            </Link>   
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default SignUp;