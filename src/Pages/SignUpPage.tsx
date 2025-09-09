import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { FaCar } from "react-icons/fa";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { signupFormValidation } from "../Utils/FormValidation";
import { signupAPI } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../Utils/NotificationService";

export const SignUpPage = () => {
  // Initial values of Signup form inputs
  const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER",
  };

  // State to manage : data in input fields
  const [data, setData] = useState<{ [key: string]: string }>(form);

  // State to manage : validation errors in input fields
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  // State : To manage loader
  const [loader, setLoader] = useState<boolean>(false);

  // Navigation
  const navigate = useNavigate();

  // Handle Data function -> save data onChange of input fields
  const onChangeHandleData = (e: any) => {
    // console.log(e);

    // Role Input
    if (typeof e === "string") {
      // For Mantine Select input which returns value directly
      setData({ ...data, role: e });
      return;
    }

    // Remaining Input fields
    // const {name, value} = e.target;
    let name = e.target.name;
    let value = e.target.value;

    setData({ ...data, [name]: value });

    // Validation Error checks
    setFormError({ ...formError, [name]: signupFormValidation(name, value) });

    // console.log(name);

    // ConfirmPassword input field validation
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setFormError({
          ...formError,
          [name]: "Passwords does not match.",
        });
      } else {
        setFormError({
          ...formError,
          [name]: "",
        });
      }
    }

    // Password input field validation
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords does not match.";
      else err = "";

      setFormError({
        ...formError,
        [name]: signupFormValidation(name, value),
        confirmPassword: err,
      });
    }
  };

  // Submit Signup Form - Register API call
  const submitSignupForm = async (e: any) => {
    e.preventDefault();

    // Check input validation onSubmit
    let valid = true;

    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      if (key === "role") continue;

      if (key !== "confirmPassword")
        newFormError[key] = signupFormValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords does not match.";

      // if any input field is having validation error, then set valid = false
      if (newFormError[key]) valid = false;
    }

    // Set validation input error
    setFormError(newFormError);

    // Validation failed, Don't proceed further
    if (valid === false) return;

    // console.log("User Data : ", data);

    // Show Loader
    setLoader(true);

    try {
      await signupAPI(data);

      // console.log("Register success data : ", response);

      // Hide Loader
      setLoader(false);

      // Show Success Notification
      successNotification(
        "User Registered Successfully",
        "Navigating to Login Page"
      );

      // Navigate to Login Page
      navigate("/login");
    } catch (error: any) {
      // Hide Loader
      setLoader(false);

      // Error Notification
      errorNotification("Failed to fetch all jobs", error.response?.data);
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex bg-slate-100">
        {/* Left */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-3 bg-purple-200 rounded-r-[200px]">
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

        {/* Right */}
        <div className="w-1/2 flex flex-col justify-center px-20 gap-3">
          <h6 className="text-lg font-semibold">Create Account</h6>

          {/* Name Input */}
          <TextInput
            withAsterisk
            name="name"
            label="Full Name"
            placeholder="Your name"
            value={data.name}
            onChange={onChangeHandleData}
            error={formError.name}
          />

          {/* Email Input */}
          <TextInput
            leftSection={<MdOutlineAlternateEmail />}
            withAsterisk
            name="email"
            label="Email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandleData}
            error={formError.email}
          />

          {/* Password Input */}
          <PasswordInput
            withAsterisk
            name="password"
            leftSection={<MdLockOutline />}
            label="Password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandleData}
            error={formError.password}
          />

          {/* Confirm Password Input */}
          <PasswordInput
            withAsterisk
            name="confirmPassword"
            leftSection={<MdLockOutline />}
            label="Confirm Password"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={onChangeHandleData}
            error={formError.confirmPassword}
          />

          {/* User Role */}
          <Select
            label="Role"
            withAsterisk
            placeholder="Select Role"
            data={["BUYER", "SELLER"]}
            value={data.role}
            onChange={onChangeHandleData}
          />

          {/* Signup Button */}
          <Button
            onClick={submitSignupForm}
            autoContrast
            variant="filled"
            color="violet"
          >
            Sign Up
          </Button>

          {/* Login  */}
          <p className="text-center">
            Already have an account ?{" "}
            <a
              href="/login"
              className="font-semibold text-violet-500 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

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
