import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser } = useAuth();

  // ⭐ Image Preview
  const watchImage = watch("image");
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watchImage]);

  // ⭐ Convert file → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleRegister = async (data) => {
    const imageFile = data.image?.[0];
    if (!imageFile) {
      alert("Image is required");
      return;
    }

    // Convert to base64
    const base64Image = await toBase64(imageFile);

    // Get ImageBB API key
   const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

if (!apiKey) {
  alert("ImageBB API key missing");
  return;
}

const formData = new FormData();
formData.append("key", apiKey);
formData.append("image", base64Image.split(",")[1]);
    // Upload file to ImageBB
    const uploadRes = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const uploadedImage = await uploadRes.json();

    if (!uploadedImage.success) {
      alert("Image upload failed");
      return;
    }

    const photoURL = uploadedImage.data.url;

    // Firebase user creation
    registerUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log("Registered User:", user);

        // Update Firebase profile
        await updateProfile(user, {
          displayName: data.name,
          photoURL: photoURL,
        });

        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* LEFT SECTION */}
      <motion.div
        className="flex items-center justify-center px-8 lg:px-20 py-10"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src="/logo.svg" alt="ZapShift Logo" className="w-40 mb-10" />

          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600 mb-6">Register with ZapShift</p>

          {/* Profile Preview */}
          <div className="flex justify-center mb-6">
            <motion.div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/profileIcon.svg"
                  className="w-8 opacity-70"
                  alt="default icon"
                />
              )}
            </motion.div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(handleRegister)}>
            {/* IMAGE UPLOAD */}
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className={`w-full border rounded-lg px-4 py-3 mb-2 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mb-3">
                {errors.image.message}
              </p>
            )}

            {/* NAME */}
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-lg px-4 py-3 mb-1 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-3">
                {errors.name.message}
              </p>
            )}

            {/* EMAIL */}
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className={`w-full border rounded-lg px-4 py-3 mb-1 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </p>
            )}

            {/* PASSWORD */}
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={`w-full border rounded-lg px-4 py-3 pr-10 mb-1 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">
                {errors.password.message}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button className="w-full bg-lime-500 text-white py-3 mt-2 rounded-lg font-semibold hover:bg-lime-600 transition">
              Register
            </button>
          </form>

          {/* LOGIN REDIRECT */}
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-lime-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="px-2 text-gray-500 text-sm">Or</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* GOOGLE BUTTON */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition">
            <FcGoogle className="text-xl" /> Register with Google
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        className="hidden lg:flex items-center justify-center bg-[#F8FBEF]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <img
          src="/authImage.png"
          alt="Register Illustration"
          className="w-[420px]"
        />
      </motion.div>
    </motion.div>
  );
}
