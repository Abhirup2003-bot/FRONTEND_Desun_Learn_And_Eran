import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InputField, Button } from "../components";

import desunLogo from "../assets/logo.png";
import Desunlogo from "../assets/Desun Logo_.png";

import { FaEnvelope, FaLock, FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Single handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function onClickHandler(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/register-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // ✅ send full data
          credentials: "include",
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg = data?.message || "Signup failed";
        toast.error(msg);
        setError(msg);
        return;
      }

      toast.success("User Registered Successfully");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      const msg = "Something went wrong";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="lg:w-1/2 w-full relative flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-[#82c600] via-green-600 to-green-900">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        <div className="z-10 px-6 lg:px-12 max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-10">
            <img src={Desunlogo} alt="logo" className="h-20 w-100" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Learn. Build. <br /> Grow Faster 🚀
          </h1>

          <p className="text-gray-200 text-sm lg:text-base mb-8">
            Join thousands of learners mastering real-world skills.
          </p>

          <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          {/* LOGO */}
          <div className="flex justify-center mb-3">
            <img src={desunLogo} alt="logo" className="h-16 w-16" />
          </div>

          {/* TITLE */}
          <div className="text-center my-2">
            <h2 className="text-2xl font-bold text-green-600">
              Register to Desun Academy
            </h2>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-3">
            <InputField
              label="UserName"
              type="text"
              name="name"
              icon={FaUser}
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              icon={FaPhoneAlt}
              value={formData.phone}
              onChange={handleChange}
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              icon={FaEnvelope}
              value={formData.email}
              onChange={handleChange}
            />

            {/* GENDER */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <div className="flex gap-3 mt-1">
                {["male", "female", "other"].map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <InputField
              label="Password"
              type="password"
              name="password"
              icon={FaLock}
              iconEye={FaRegEyeSlash}
              value={formData.password}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <Button
              text={loading ? "Signing up..." : "Signup"}
              variant="success"
              onClick={onClickHandler}
            />
          </div>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
