import React, { useRef, useState } from "react";
import "./signup.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from "formik";
import ValidateNationalId from "../Validation/ValidationNationalId";
import axios from "axios";
import { Navigate, Router, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
// import { formatPhoneNumber } from "react-phone-number-input";

const Signup = () => {
  const token = localStorage.getItem("accessToken");
  // const [alert, setAlert] = useState(false);






  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "نام  خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/i.test(values.name)) {
      errors.name = "لطفا از کیبورد فارسی استفاده نمایید";
    }

    if (!values.lastname) {
      errors.lastname = "نام خانوادگی خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/i.test(values.name)) {
      errors.lastname = "لطفا از کیبورد فارسی استفاده نمایید";
    }
    if (!ValidateNationalId(values.code) || values.code === "123456789") {
      errors.code = "لطفا کد ملی ده رقمی خود را وارد نمایید";
    }
    if (!values.email) {
      errors.email = "ایمیل خود را وارد نمایید";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "فرمت ایمیل صحیح نمیباشد";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "شماره موبایل خود را وارد کنید";
    } else if (
      !/^(\+98|0098|98|0)?9\d{9}$/.test(
        values.phonenumber
      )
    ) {
      errors.phonenumber = "  شماره وارد شده اشتباه است ";
    }

    if (!values.password) {
      errors.password = "رمزعبور اشتباه است";
    }
    return errors;
  };

  const [isLoading, setIsLoading] = useState(false);

  const registerOnSubmit = async (values) => {
    try {
      const url = "http://192.168.130.195:7080/api/v1/user/register";
      setIsLoading(true);
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      var jsonObject = {
        username: values.code,
        firstName: values.name,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
      };

      // axios
      //   .post(url, JSON.stringify(jsonObject), customConfig)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const { status, data } = await axios.post(
        url,
        JSON.stringify(jsonObject),
        customConfig
      );

      if (status < 300) {
        enqueueSnackbar("ثبتنام با موفقیت انجام شد", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: { vertical: "top", horizontal: "left" },
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      }
    } catch (err) {
      enqueueSnackbar("کاربر تکراری است", {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
      });

      setIsLoading(false);
      // setAlert(true);
      console.log(err.message);
    }
  };

  const captcha = useRef();

  const onChange = () => {
    console.log(captcha);
  };

  return (
    <>
      <Navbar />
      {/* {
      token ?
      <Navigate replace to="/" />
      : */}
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          code: "",
          email: "",
          password: "",
        }}
        onSubmit={registerOnSubmit}
        validate={validate}
      >
        {({ errors, touched }) => (
          <Form className="auth-wrapper">
            <div className="auth-inner">
              <h2>ثبت نام</h2>

              <div className="mb-3">
                <label>نام </label>
                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="نام خود را وارد کنید"
                />
                {touched.name || errors.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label> نام خانوادگی</label>
                <Field
                  name="lastname"
                  type="text"
                  className="form-control"
                  placeholder=" نام خانوادگی خود را وارد کنید"
                />
                {touched.lastname || errors.lastname ? (
                  <div className="error">{errors.lastname}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label> کد ملی</label>
                <Field
                  name="code"
                  type="text"
                  className="form-control"
                  placeholder="کد ملی خود را وارد کنید"
                />
                {touched.code || errors.code ? (
                  <div className="error">{errors.code}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label>آدرس ایمیل</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="ایمیل خود را وارد کنید"
                />
                {touched.email || errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label>شماره موبایل</label>
                <Field
                  name="phonenumber"
                  type="phonenumber"
                  className="form-control"
                  placeholder="شماره موبایل خود را وارد کنید"
                />
                {touched.phonenumber || errors.phonenumber ? (
                  <div className="error">{errors.phonenumber}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label>رمز عبور</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="رمز خود را وارد کنید"
                />
                {touched.password || errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LcsH7IhAAAAAPFEDAOkCo6gfizp7GQdNfXsg8sd"
                onChange={onChange}
                style={{ justifyContent: "center" }}
                className="captcha"
              />

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  {isLoading ? loadingSvg : "ثبت نام"}
                </button>
              </div>

              <p className="forgot-password text-center">
                <a href="/sign-in">عضو هستم!</a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {/* } */}
    </>
  );
};

export default Signup;

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

// const loadingSvg = (
//   <div className="lds-roller">
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//   </div>
// );
