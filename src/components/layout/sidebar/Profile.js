import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../config/axios";
import { Token } from "../../../Constants/LocalStorageConstants";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnackbar } from "notistack";

const Profile = ({ setMode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const username = localStorage.getItem("username");

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem(Token);

  const {
    register,
    watch,
    reset,
    getFieldState,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: { username: "", firstname: "", lastname: "", email: "" },
  });

  const GetUserInfo = useCallback(async () => {
    const response = await axios(`/user/${username}`, {
      method: "GET",

      headers: { Authorization: JSON.parse(token).token },
    });
    if (response && response.status < 300) {
      const {
        username = "",
        firstName: firstName,
        lastName: lastName,
        email = "",
      } = response.data;
      setValue("username", username);
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
    }
  }, []);
  useEffect(() => {
    GetUserInfo();
  }, []);

  const values = watch();
  const submit = async (event) => {
    event.preventDefault();
    const validate = getFieldState();

    if (!validate.invalid) {
      const response = await axios("/user", {
        method: "PUT",
        data: values,
        headers: { Authorization: JSON.parse(token).token },
      });
      if (response && response.status < 300) {
        enqueueSnackbar("تغییرات با موفقیت انجام شد", {
          variant: "success",
          appear: 5000,
        });

        setIsLoading(false);
      } else {
        enqueueSnackbar("خطا در ایجاد تغییرات", { variant: "error" });
        setIsLoading(false);
      }
    } else {
      enqueueSnackbar("invalid Email", { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-black mt-4  w-full desktop:flex-1 rounded-2.5x p-3 ">
      {errors.email && errors.email.message}
      <form class="w-full max-w my-8 pt-8" autoComplete="off">
        <div class="flex items-center border-b border-teal-500 py-2 mt-4 bg-gray-100 rounded-xl">
          <div>کدملی</div>
          <input
            class="appearance-none  border-none w-full text-gray-400  py-1 px-2 leading-tight focus:outline-none text-center mr-8"
            type="text"
            aria-label="username"
            {...register("username")}
            disabled
          />
        </div>
        <div class="flex items-center border-b border-teal-500 py-2 mt-4 rounded-xl">
          <div>نام</div>
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none text-center mr-8"
            type="text"
            aria-label="first name"
            {...register("firstName")}
          />
        </div>

        <div class="flex items-center border-b border-teal-500 py-2 mt-4 rounded-xl">
          <div>نام خانوادگی</div>
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none text-center "
            type="text"
            aria-label="last name"
            {...register("lastName")}
          />
        </div>

        <div class="flex items-center border-b border-teal-500 py-2 mt-4 rounded-xl">
          <div>ایمیل</div>
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none text-center"
            type="email"
            aria-label="email"
            {...register("email")}
          />
        </div>
      </form>
      <div className="grid">
        <button
          className="h-12 my-2 btn-success hover:bg-red  text-xxl  text-black py-1 px-4 rounded-xl "
          onClick={submit}
        >
          {isLoading ? loadingSvg : "ثبت "}
        </button>

        <button
          className="block border-transparent justify-centers border-4 text-rose-600 hover:text-rose-700 text-sm py-1 px-2 rounded text-center"
          type="button"
          onClick={() => setMode("default")}
        >
          انصراف
        </button>
      </div>
    </div>
  );
};

export default Profile;

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
