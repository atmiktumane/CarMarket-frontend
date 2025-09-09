import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { useInterval } from "@mantine/hooks";
import { loginFormValidation } from "../Utils/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Utils/NotificationService";
import {
  changePasswordAPI,
  sendOtpAPI,
  verifyOtpAPI,
} from "../Services/UserService";

export const ResetPassword = (props: any) => {
  // State : to manage email
  const [email, setEmail] = useState<string>("");

  // State : to manage password
  const [password, setPassword] = useState<string>("");

  // State : to manage small loader
  const [smallLoader, setSmallLoader] = useState<boolean>(false);

  // State : to manage sentOTP (To disable button after sending OTP)
  const [sentOtp, setSentOtp] = useState<boolean>(false);

  // State : to manage Verified OTP (To disable PinInput and buttons after verifying OTP )
  const [verifiedOtp, setVerifiedOtp] = useState<boolean>(false);

  // State : to manage Password error validation
  const [passwordError, setPasswordError] = useState<string>("");

  // State : to manage Resent Loader (Resent OTP after 60 seconds)
  const [resendLoader, setResendLoader] = useState<boolean>(false);

  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1); // Timer for 60 seconds to enable "Resend OTP" option
  }, 1000);

  // Handle Send OTP Function
  const handleSendOTP = async () => {
    setSmallLoader(true);

    try {
      // Send OTP API Call
      const response = await sendOtpAPI(email);

      //   console.log("Send Otp success", response);

      // Disable Send OTP Button
      setSentOtp(true);

      // Enable Resend Loader
      setResendLoader(true);

      // Show Success Notification
      successNotification(response?.message, "Enter OTP to reset Password.");

      // Start ResendOTP countdown
      interval.start();

      setSmallLoader(false);
    } catch (error: any) {
      // Hide Loader
      setSmallLoader(false);

      // Error Notification
      errorNotification("Error", "OTP Sending Failed");
    }
  };

  // Handle Reset OTP Function
  const handleResendOtp = () => {
    // Resent Loader is true, means SendOTP API Call is made already, return
    if (resendLoader === true) return;

    // Make SendOTP API Call
    handleSendOTP();
  };

  // Handle Verify OTP Function
  const handleVerifyOtp = async (otp: any) => {
    // console.log(otp);

    try {
      // Verify OTP API call
      const response = await verifyOtpAPI(email, otp);

      //   console.log("Verify OTP response : ", response);

      // update State to display Reset password
      setVerifiedOtp(true);

      // Success Notification
      successNotification(response?.message, "Please reset password.");
    } catch (error: any) {
      // Error Notification
      errorNotification("Error", "OTP Verification failed");
    }
  };

  // Handle Reset Password Function
  const handleResetPassword = async () => {
    try {
      // Reset Password API Call
      const response = await changePasswordAPI({ email, password });

      // Success Notification
      successNotification(response?.message, "Login with new password.");

      // Close Modal
      props.close();

      // Reset all States
      setEmail("");
      setPassword("");
      setSmallLoader(false);
      setSentOtp(false);
      setVerifiedOtp(false);
      setPasswordError("");
      setResendLoader(false);
    } catch (error: any) {
      // Error Notification
      errorNotification("Error", "Reset Password Failed");
    }
  };

  return (
    <>
      <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div className="flex flex-col gap-5">
          {/* Email Input */}
          {!sentOtp && (
            <TextInput
              size="md"
              leftSection={<MdOutlineAlternateEmail />}
              withAsterisk
              label="Email"
              placeholder="Your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //   error={formError.email}
              rightSection={
                <Button
                  onClick={handleSendOTP}
                  autoContrast
                  variant="filled"
                  className="mr-1"
                  loading={smallLoader}
                  disabled={email === "" || sentOtp}
                >
                  Send OTP
                </Button>
              }
              rightSectionWidth="xl"
            />
          )}

          {/* PinInput to Enter OTP (Conditional) */}
          {sentOtp && !verifiedOtp && (
            <div className="flex flex-col gap-5">
              {/* PinInput */}
              <PinInput
                size="md"
                length={6}
                type="number"
                className="mx-auto"
                onComplete={handleVerifyOtp}
              />

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Button - Resend OTP button */}
                <Button
                  onClick={handleResendOtp}
                  autoContrast
                  variant="light"
                  color="brightSun.4"
                  loading={smallLoader}
                  fullWidth
                >
                  {resendLoader ? seconds : "Resend OTP"}
                </Button>

                {/* Button - Change Email button */}
                <Button
                  onClick={() => {
                    setSentOtp(false);
                    setResendLoader(false);
                    setSeconds(60);
                    setVerifiedOtp(false);
                    interval.stop();
                  }}
                  autoContrast
                  variant="filled"
                  fullWidth
                >
                  Change Email
                </Button>
              </div>
            </div>
          )}

          {/* Reset Password (Conditional) */}
          {verifiedOtp && (
            <div className="flex flex-col gap-3">
              {/* Password Input */}
              <PasswordInput
                size="md"
                withAsterisk
                label="Password"
                leftSection={<MdLockOutline />}
                placeholder="Change Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(
                    loginFormValidation("password", e.target.value)
                  );
                }}
                error={passwordError}
              />

              {/* Button - Reset Password Btn */}
              <Button
                onClick={handleResetPassword}
                autoContrast
                variant="filled"
                loading={smallLoader}
              >
                Reset Password
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
