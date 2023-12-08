import React, { useEffect } from "react";
import CustomInput from "./layout/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../action/features/auth/authSlice"

let signUpschema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
    userName: yup.string().required("Username is Required"),
    phone: yup.string().required("Phone number is Required"),
    fullName: yup.string().required("Fullname is Required"),
    role: yup.string().required("You must choice role"),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            userName: "",
            phone: "",
            fullName: "",
            role: "",
        },
        validationSchema: signUpschema,
        onSubmit: (values) => {
          dispatch(signup(values));
        },

    });
    const authState = useSelector((state) => state);

    const { user, isError, isSuccess, isLoading, message } = authState.auth;
  
    useEffect(() => {
      if (isSuccess) {
        navigate("login");
      } else {
        navigate("");
      }
    }, [user, isError, isSuccess, isLoading]);
    return (
      <FormikProvider value={formik}>
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
            <h3 className="text-center title">SignUp</h3>
            
            
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="text"
                label="Email Address"
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
                label="Username"
                id="userName"
                name="userName"
                onChng={formik.handleChange("userName")}
                onBlr={formik.handleBlur("userName")}
                val={formik.values.userName}
              />
              <div className="error mt-2">
                {formik.touched.userName && formik.errors.userName}
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
              <CustomInput
                type="text"
                label="FullName"
                id="fullName"
                name="fullName"
                onChng={formik.handleChange("fullName")}
                onBlr={formik.handleBlur("fullName")}
                val={formik.values.fullName}
              />
              <div className="error mt-2">
                {formik.touched.fullName && formik.errors.fullName}
              </div>
              
              <button
                className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                style={{ background: "#ffd333" }}
                type="submit"
              >
                SignUp
              </button>
              
            </form>
          </div>
        </div>
        </FormikProvider>
    )
}

export default SignUp;