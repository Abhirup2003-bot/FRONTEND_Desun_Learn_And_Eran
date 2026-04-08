import React, { useState, useRef, useEffect } from "react";
import Desunlogo from "../../assets/Desun Logo_.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const profileRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const linkClass =
    "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#82C600] hover:text-white transition";

  const activeClass = "bg-[#82C600] text-white";

  // Close profile dropdown
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ FIXED LOGOUT (NO redux-persist)
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // clears redux + localStorage
      setMenuOpen(false); // optional UX
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  const handleSearch = () => {
    console.log("Searching:", search);
  };

  return (
    <header className="w-full backdrop-blur-md bg-white/80 border-b sticky top-0 z-50">
      {/* MAIN HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link to="/" className="w-28 sm:w-32 md:w-56">
            <img src={Desunlogo} alt="logo" />
          </Link>
        </div>

        {/* CENTER NAV */}
        <nav className="hidden md:flex gap-3">
          {["/", "/contest", "/contact"].map((path, i) => {
            const labels = ["Home", "Contests", "Contact"];
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  isActive ? `${linkClass} ${activeClass}` : linkClass
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </nav>

        {/* SEARCH */}
        <div
          className={`hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 transition-all duration-300 ${
            searchActive ? "w-64" : "w-36"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
            onChange={(e) => setSearch(e.target.value)}
          />

          {searchActive && (
            <button onClick={handleSearch} className="text-gray-600">
              <FaSearch />
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* USER INFO */}
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-700">
                    Hello, {user?.userName || "User"}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
                    {user?.email}
                  </span>
                </div>

                {/* PROFILE */}
                <div className="relative" ref={profileRef}>
                  <FaUserCircle
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="text-3xl cursor-pointer text-gray-700 hover:text-[#82C600]"
                  />

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        <FaUser /> Profile
                      </Link>

                      <Button
                        text="Logout"
                        variant="logout"
                        onClick={handleLogout}
                        icon={<FaSignOutAlt />}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button text="Login" variant="outline" />
                </Link>
                <Link to="/signup">
                  <Button text="Sign Up" variant="gradient" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        } bg-white border-t`}
      >
        <div className="flex flex-col p-4 gap-3">
          {/* USER INFO */}
          {isLoggedIn && (
            <div className="border-b pb-3 mb-3">
              <p className="text-sm font-semibold text-gray-700">
                Hello, {user?.userName || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}

          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/contest" onClick={() => setMenuOpen(false)}>
            Contests
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mt-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm"
            />
            <FaSearch />
          </div>

          {/* USER ACTION */}
          {isLoggedIn ? (
            <Button
              text="Logout"
              variant="danger"
              onClick={handleLogout}
              icon={<FaSignOutAlt />}
            />
          ) : (
            <>
              <Link to="/login">
                <Button text="Login" variant="outline" />
              </Link>
              <Link to="/signup">
                <Button text="Sign Up" variant="gradient" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
