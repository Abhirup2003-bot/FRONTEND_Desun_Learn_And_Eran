import React, { useState, useEffect } from "react";
import Desunlogo from "../../assets/Desun Logo_.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../index";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ NEW

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const linkClass =
    "px-3 lg:px-4 py-2 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-[#82C600] hover:text-white transition";

  const activeClass = "bg-[#82C600] text-white";

  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/signup";

  // ✅ CHECK LOGIN USING FETCH (cookie-based)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://backend-three-tau-88.vercel.app/app/v1/Learn/me",
          {
            method: "GET",
            credentials: "include", // 🔥 IMPORTANT
          },
        );

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location]);

  // ✅ LOGOUT USING FETCH
  const handleLogout = async () => {
    try {
      await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/logOutUse",
        {
          method: "POST",
          credentials: "include",
        },
      );

      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-3 gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-32 sm:w-40 md:w-48 lg:w-56">
            <img
              src={Desunlogo}
              alt="logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6">
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

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm mx-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#82C600]"
          />
          <button className="px-3 py-2 bg-[#82C600] text-white text-xs sm:text-sm rounded-r-md hover:bg-[#6ea800] transition">
            Search
          </button>
        </div>

        {/* ✅ Desktop Buttons FIXED */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          {isLoggedIn ? (
            <Button text="Logout" variant="danger" onClick={handleLogout} />
          ) : (
            <>
              {!isLoginPage && (
                <Link to="/login">
                  <Button text="Login" variant="success" />
                </Link>
              )}

              {!isSignupPage && (
                <Link to="/signup">
                  <Button text="Sign Up" variant="signup" />
                </Link>
              )}
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 py-4 px-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md"
            />

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

            {/* ✅ Mobile Buttons FIXED */}
            <div className="flex flex-col gap-2 mt-2">
              {isLoggedIn ? (
                <Button text="Logout" variant="danger" onClick={handleLogout} />
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button text="Login" variant="success" />
                  </Link>

                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button text="Sign Up" variant="success" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
