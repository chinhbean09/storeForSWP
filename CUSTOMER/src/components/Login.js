import React, { useEffect, useContext } from "react";
import CustomInput from "./layout/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/features/auth/authSlice"
import styled from "styled-components";

let loginschema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginschema,
    onSubmit: (values) => {
      dispatch(login(values));
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
    <Wrapper>
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4 fix">
        <h1 className="text-center title fix">Login</h1>
        <p className="text-center fix">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an User" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <p>Email Address :</p>
          <CustomInput
          className="fix1"
            type="text"
            
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
            style={{ fontSize: '26px', padding: '0px !important' }}
            />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <p>Password :</p>
          <CustomInput
          className="fix1"
            type="password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
         
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 fix1"
            style={{ background: "#ffd333" }}
            type="submit"
            
          >
            Login
          </button>
          
          <div className="mb-2 text-first">
            Don't have any account?
            <Link to="/SignUp" className="">
              Register
            </Link>   
          </div>
        </form>
      </div>
    </div></Wrapper>
  );
};

export default Login;
const Wrapper = styled.section`
.fix1{
  font-size: 2.2rem !important;
  height: 40px !important;
}
.fix{
  font-size:2.2rem !important;
}
label{
  opacity: 0.5;
}
`