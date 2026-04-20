import React from "react";
import Desunlogo from "../assets/Desun Logo_.png";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../components/index";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";

const HeaderUI = ({
  menuOpen,
  setMenuOpen,
  profileOpen,
  setProfileOpen,
  profileRef,
  invitations,
  inviteModal,
  setInviteModal,
  isLoggedIn,
  user,
  handleAccept,
  handleReject,
  handleLogout,
}) => {
  const linkClass =
    "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#82C600] hover:text-white transition";

  const activeClass = "bg-[#82C600] text-white";

  return (
    <>
      {/* HEADER */}
      <header className="w-full backdrop-blur-md bg-white/80 border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LEFT */}
          <Link to="/" className="w-36 sm:w-42 md:w-56">
            <img src={Desunlogo} alt="logo" />
          </Link>

          {/* CENTER */}
          <nav className="hidden md:flex gap-3">
            {["/", "/contest", "/my-contests", "/winners"].map((path, i) => {
              const labels = ["Home", "Contests", "My Contests", "Winners"];
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

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  {/* 🔔 BELL */}
                  <div className="relative">
                    <FaBell
                      onClick={() => setInviteModal(true)}
                      className="text-xl cursor-pointer text-gray-700 hover:text-[#82C600]"
                    />
                    {invitations.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                        {invitations.length}
                      </span>
                    )}
                  </div>

                  {/* USER */}
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

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* ✅ PREMIUM MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* DRAWER */}
          <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl p-5 flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <img src={Desunlogo} alt="logo" className="w-32" />
              <FaTimes
                className="text-xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* NAV LINKS */}
            <div className="flex flex-col gap-3">
              {["/", "/contest", "/my-contests", "/winners"].map((path, i) => {
                const labels = ["Home", "Contests", "My Contests", "Winners"];
                return (
                  <NavLink
                    key={i}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-base font-medium transition ${
                        isActive
                          ? "bg-[#82C600] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {labels[i]}
                  </NavLink>
                );
              })}
            </div>

            <hr className="my-6" />

            {/* USER SECTION */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-4 mt-auto">
                {/* USER INFO */}
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="font-semibold text-gray-800">
                    {user?.userName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                {/* INVITATIONS */}
                <button
                  onClick={() => {
                    setInviteModal(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaBell />
                    Invitations
                  </div>
                  <span className="text-sm text-gray-500">
                    ({invitations.length})
                  </span>
                </button>

                {/* PROFILE */}
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  <FaUser /> Profile
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-auto">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button text="Login" variant="outline" />
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button text="Sign Up" variant="gradient" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INVITE MODAL */}
      {inviteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-xl p-5 relative">
            <h2 className="text-lg font-semibold mb-4">
              Invitations ({invitations.length})
            </h2>

            <button
              onClick={() => setInviteModal(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <div className="max-h-[400px] overflow-y-auto space-y-3">
              {invitations.length === 0 ? (
                <p>No invitations found</p>
              ) : (
                invitations.map((invite) => (
                  <div key={invite._id} className="p-3 border rounded-lg">
                    <p>{invite?.team?.name}</p>
                    <p>Invited by {invite?.sender?.userName}</p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAccept(invite._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded-xl"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(invite._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-xl"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderUI;
