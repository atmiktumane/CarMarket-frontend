import { Button, PasswordInput, TextInput } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";

export const LoginPage = () => {
  return (
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
          // value={loginData.email}
          // onChange={onChangeHandleData}
          // error={formError.email}
        />

        {/* Password Input */}
        <PasswordInput
          withAsterisk
          leftSection={<MdLockOutline />}
          label="Password"
          placeholder="Password"
          name="password"
          // value={loginData.password}
          // onChange={onChangeHandleData}
          // error={formError.password}
        />

        {/* Login Button */}
        <Button
          // onClick={submitLoginForm}
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
        <button
          // onClick={open}
          className="text-violet-500 hover:underline"
        >
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
  );
};
