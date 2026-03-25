import React, { useState } from "react";
import desunLogo from "../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../index";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass =
    "px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-[#82C600] hover:text-white transition";

  const activeClass = "bg-[#82C600] text-white";

  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/signup";

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* ✅ Logo */}
        <div className="flex items-center gap-2">
          <img
            src={desunLogo}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            alt="logo"
          />
          <span className="text-lg sm:text-xl font-bold text-gray-800">
            Desun Academy
          </span>
        </div>

        {/* ✅ Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Contests
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* ✅ Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoginPage && <Button text="Logout" variant="danger" />}

          {!isSignupPage && !isLoginPage && (
            <Link to="/login">
              <Button text="Login" variant="success" />
            </Link>
          )}

          {!isSignupPage && !isLoginPage && (
            <Link to="/signup">
              <Button text="SignUp" variant="signup" />
            </Link>
          )}
        </div>

        {/* ✅ Hamburger (INSIDE header now) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* ✅ Mobile Menu (fixed design) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col items-center gap-3 py-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Contests
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Contact
            </Link>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              {isLoginPage && <Button text="Logout" variant="danger" />}

              {!isSignupPage && !isLoginPage && (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button text="Login" variant="success" />
                </Link>
              )}

              {!isSignupPage && !isLoginPage && (
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button text="SignUp" variant="signup" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
