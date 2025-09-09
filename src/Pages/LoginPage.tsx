import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loginFormValidation } from "../Utils/FormValidation";
import { loginAPI } from "../Services/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utils/NotificationService";
import { setLocalStorageItem } from "../Utils/LocalStorage";
import { useDisclosure } from "@mantine/hooks";
import { ResetPassword } from "../Components/ResetPassword";

export const LoginPage = () => {
  // Initial values of Login form inputs
  const form = {
    email: "",
    password: "",
  };

  // State to manage : data in input fields
  const [loginData, setLoginData] = useState<{ [key: string]: string }>(form);

  // State to manage : validation errors in input fields
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  // State : To manage loader
  const [loader, setLoader] = useState<boolean>(false);

  // Mantine ResetPassword Modal (Open/Close)
  const [opened, { open, close }] = useDisclosure(false);

  // Navigation
  const navigate = useNavigate();

  // Handle Data function -> save data onChange of input fields
  const onChangeHandleData = (e: any) => {
    // Input fields
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });

    // Validation Error checks
    setFormError({ ...formError, [name]: loginFormValidation(name, value) });
  };

  // Login Form Submit
  const submitLoginForm = async (e: any) => {
    e.preventDefault();

    // Check input validation onSubmit
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in loginData) {
      // console.log(key, " -- ", loginData[key]);
      newFormError[key] = loginFormValidation(key, loginData[key]);

      // if any input field is having validation error, then set valid = false
      if (newFormError[key]) valid = false;
    }

    // Set validation input error
    setFormError(newFormError);

    // Validation failed, Don't proceed further
    if (valid === false) return;

    // Show Loader while API Calling
    setLoader(true);

    try {
      const response = await loginAPI(loginData);

      console.log("Login success data : ", response);

      // Save data in Local Storage
      setLocalStorageItem("user", response);

      // Hide Loader
      setLoader(false);

      // Show Success Notification
      successNotification("Success", "Login Successfull");

      // Navigate to Another Page based on User Role
      if (response.role === "ADMIN") {
        navigate("/admin");
      } else if (response.role === "SELLER") {
        navigate("/seller");
      } else {
        navigate("/buyer");
      }
    } catch (error: any) {
      // Hide Loader
      setLoader(false);

      // Error Notification
      errorNotification("Error", "Failed to Login");
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-slate-100">
        {/* Left */}
        <div className="w-1/2 flex flex-col justify-center px-20 gap-3">
          <h6 className="text-lg font-semibold">Login to Account</h6>

          {/* Email Input */}
          <TextInput
            leftSection={<MdOutlineAlternateEmail />}
            withAsterisk
            label="Email"
            placeholder="Your email"
            name="email"
            value={loginData.email}
            onChange={onChangeHandleData}
            error={formError.email}
          />

          {/* Password Input */}
          <PasswordInput
            withAsterisk
            leftSection={<MdLockOutline />}
            label="Password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={onChangeHandleData}
            error={formError.password}
          />

          {/* Login Button */}
          <Button
            onClick={submitLoginForm}
            autoContrast
            variant="filled"
            color="violet"
          >
            Login
          </Button>

          {/* Signup  */}
          <p className="text-center">
            Don't have an account ?{" "}
            <a
              href="/signup"
              className="font-semibold text-violet-500 hover:underline"
            >
              Signup
            </a>
          </p>

          {/* Reset Password */}
          <button onClick={open} className="text-violet-500 hover:underline">
            Reset Password ?
          </button>
        </div>

        {/* Right */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-3 bg-purple-200 rounded-l-[200px]">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <FaCar className="h-14 w-14 text-purple-700" />
            <p className="text-5xl font-bold text-purple-500">CarMarket</p>
          </div>

          {/* Description */}
          <p className="text-lg font-semibold text-violet-500">
            Buy or Sell Your Car
          </p>
        </div>
      </div>

      {/* Open ResetPassword Modal */}
      <ResetPassword opened={opened} close={close} />

      {/* Loader */}
      <LoadingOverlay
        visible={loader}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "violet", type: "bars" }}
      />
    </>
  );
};
