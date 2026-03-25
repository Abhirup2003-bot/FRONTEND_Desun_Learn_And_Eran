import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Fix: import from react-router-dom
import { InputField, Button } from "../components/index";

import desunLogo from "../assets/logo.png";
import Desunlogo from "../assets/Desun Logo_.png";

import { FaEnvelope, FaLock, FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ Add this if using toast

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Add formData & handleChange for InputField
  const formData = { name, email, password };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (phoneNumber === "tel") setEmail(value);
    if (name === "password") setPassword(value);
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
          body: JSON.stringify({ name, email, password }),
          credentials: "include",
        },
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = data?.message || "Signup failed";
        toast.error(msg);
        setError(msg);
        setLoading(false);
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
            Join thousands of learners mastering real-world skills, solving
            challenges, and building impactful projects.
          </p>

          <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
            Get Started
          </button>

          <div className="flex gap-6 mt-12 text-sm">
            <div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-gray-200">Students</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-gray-200">Courses</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.8⭐</h3>
              <p className="text-gray-200">Rating</p>
            </div>
          </div>
        </div>

        <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl top-[-60px] left-[-60px]"></div>
        <div className="absolute w-80 h-80 bg-green-300/20 rounded-full blur-3xl bottom-[-60px] right-[-60px]"></div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          {/* LOGO */}
          <div className="flex justify-center mb-3">
            <img src={desunLogo} alt="logo" className="h-16 w-16" />
          </div>

          {/* TITLE */}
          <div className="text-center my-2">
            <h2 className="text-2xl lg:text-3xl font-sans font-bold text-green-600">
              Register to Desun Academy
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-3">
            <InputField
              label="UserName"
              type="name"
              name="name"
              icon={FaUser}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              icon={FaPhoneAlt}
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              icon={FaEnvelope}
            />

            {/* GENDER
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>

              <div className="flex gap-3">
                <label className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  Male
                </label>

                <label className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  Female
                </label>

                <label className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  Other
                </label>
              </div>
            </div> */}

            <InputField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={FaLock}
              iconEye={FaRegEyeSlash}
            />

            {/* REMEMBER */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-green-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <Button text="Signup" variant="success" onClick={onClickHandler} />
          </div>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Need access?{" "}
            <Link to="/login" className="text-green-600 cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
