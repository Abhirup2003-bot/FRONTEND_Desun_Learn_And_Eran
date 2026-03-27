import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, Button } from "../components";
import desunLogo from "../assets/logo.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice/loginSlice";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);

  async function onClickHandler(e) {
    e.preventDefault();
    setError("");

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successfully");
      navigate("/");
    } else {
      const errMsg = result.payload || "Login failed";

      toast.error(errMsg);
      setError(errMsg);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#82c600] via-green-600 to-emerald-800"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:20px_20px]"></div>
          <div className="absolute top-[-50px] left-[-50px] w-80 h-80 bg-lime-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-green-900/40 rounded-full blur-3xl"></div>

          <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-lg text-white">
            <span className="inline-block mb-4 px-4 py-1 text-xs tracking-wide uppercase bg-white/20 rounded-full">
              Learn • Build • Grow
            </span>

            <h1 className="text-4xl font-bold leading-tight mb-6">
              Welcome to <br />
              <span className="text-white">Desun Academy 🚀</span>
            </h1>

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Master real-world skills with hands-on projects, coding
              challenges, and structured learning paths designed for developers.
            </p>

            <div className="space-y-4 text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <p>Structured courses & guided learning</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <p>Hands-on real-world projects</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>
                <p>Track progress & stay consistent</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
            <div className="flex justify-center mb-4">
              <img src={desunLogo} alt="logo" className="h-20 w-20" />
            </div>

            <div className="text-center my-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#82c600]">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-5">
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                icon={FaEnvelope}
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                icon={FaLock}
                iconEye={FaRegEyeSlash}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <span className="text-[#82c600] cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              <Button
                onClick={onClickHandler}
                text={loading ? "Logging in..." : "Login"}
                variant="success"
                disabled={loading}
              />
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Need access?{" "}
              <Link
                to="/signup"
                className="text-green-600 cursor-pointer hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
