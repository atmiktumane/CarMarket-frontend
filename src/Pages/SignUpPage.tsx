import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";

export const SignUpPage = () => {
  return (
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
          //   value={data.name}
          //   onChange={onChangeHandleData}
          //   error={formError.name}
        />

        {/* Email Input */}
        <TextInput
          leftSection={<MdOutlineAlternateEmail />}
          withAsterisk
          name="email"
          label="Email"
          placeholder="Your email"
          //   value={data.email}
          //   onChange={onChangeHandleData}
          //   error={formError.email}
        />

        {/* Password Input */}
        <PasswordInput
          withAsterisk
          name="password"
          leftSection={<MdLockOutline />}
          label="Password"
          placeholder="Password"
          //   value={data.password}
          //   onChange={onChangeHandleData}
          //   error={formError.password}
        />

        {/* Confirm Password Input */}
        <PasswordInput
          withAsterisk
          name="confirmPassword"
          leftSection={<MdLockOutline />}
          label="Confirm Password"
          placeholder="Confirm Password"
          //   value={data.confirmPassword}
          //   onChange={onChangeHandleData}
          //   error={formError.confirmPassword}
        />

        {/* User Role */}
        <Select
          label="Role"
          withAsterisk
          placeholder="Select Role"
          data={["Buyer", "Seller"]}
        />

        {/* Signup Button */}
        <Button
          //  onClick={submitSignupForm}
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
  );
};
