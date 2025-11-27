import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { loginUser, googleLogin, resetPassword } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // 📌 Email Login
  const handelLogin = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log("Login Success:", result.user);
        navigate("/");
      })
      .catch((err) => console.log("Login Error:", err));
  };

  // 📌 Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Google Login Success:", result.user);
        navigate("/");
      })
      .catch((err) => console.error("Google Login Error:", err));
  };

  // 📌 Reset Password Handler
  const submitResetPassword = () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email");
      return;
    }

    resetPassword(resetEmail)
      .then(() => {
        setResetMessage(`Password reset link sent to ${resetEmail}`);
      })
      .catch((err) => {
        console.log(err);
        setResetMessage("Failed to send password reset link");
      });
  };

  return (
    <>
      {/* ===================== LOGIN PAGE ===================== */}
      <motion.div
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* LEFT SIDE */}
        <motion.div className="flex items-center justify-center px-8 lg:px-20 py-10">
          <div className="w-full max-w-md">
            <img src="/logo.svg" alt="ZapShift Logo" className="w-40 mb-10" />

            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Login with ZapShift</p>

            {resetMessage && (
              <p className="text-green-600 text-sm mb-2">{resetMessage}</p>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit(handelLogin)}>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
              />

              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
              />

              {/* 🔥 Open Modal */}
              <p
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-lime-600 mb-4 cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>

              <button
                type="submit"
                className="w-full bg-lime-500 text-white py-3 rounded-lg font-semibold hover:bg-lime-600 transition"
              >
                Login
              </button>
            </form>

            {/* Register Redirect */}
            <p className="text-sm text-gray-600 mt-4">
              Don’t have an account?
              <span
                className="text-lime-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                {" "}
                Register
              </span>
            </p>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="px-2 text-gray-500 text-sm">Or</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div className="hidden lg:flex items-center justify-center bg-[#F8FBEF]">
          <img src="/authImage.png" alt="Illustration" className="w-[420px]" />
        </motion.div>
      </motion.div>

      {/* ===================== CUSTOM MODAL ===================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-2">Reset Password</h3>
            <p className="text-gray-600 text-sm mb-4">
              Enter your email to receive a password reset link.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3"
            />

            {resetMessage && (
              <p className="text-green-600 text-sm mb-3">{resetMessage}</p>
            )}

            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={submitResetPassword}
                className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
              >
                Send Reset Link
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
