import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MailIcon, KeyIcon, ShieldCheckIcon } from "lucide-react"; // Optional icon lib

const ForgotAndResetPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/f/forgot-password", { email });
      toast.success("OTP sent to your email.");
      setStep("otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/f/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successfully.");
      setStep("email");
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white border rounded-2xl shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {step === "email" ? "🔐 Forgot Password" : "🔄 Reset Password"}
      </h2>

      {step === "email" ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <MailIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter the OTP sent to email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <KeyIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-medium"
          >
            Reset Password
          </button>
        </form>
      )}

      {step === "otp" && (
        <p className="mt-4 text-sm text-center text-gray-500">
          Didn’t receive the OTP?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              setStep("email");
              setOtp("");
              setNewPassword("");
            }}
          >
            Resend
          </span>
        </p>
      )}
    </div>
  );
};

export default ForgotAndResetPassword;
