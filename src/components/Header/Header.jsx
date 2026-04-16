// import React, { useState, useRef, useEffect } from "react";
// import Desunlogo from "../../assets/Desun Logo_.png";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Button } from "../index";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../../features/authSlice/authSlice";
// import {
//   FaUserCircle,
//   FaSignOutAlt,
//   FaUser,
//   FaBars,
//   FaTimes,
//   FaBell,
// } from "react-icons/fa";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [searchActive, setSearchActive] = useState(false);

//   const [invitations, setInvitations] = useState([]);
//   const [inviteModal, setInviteModal] = useState(false);

//   const profileRef = useRef();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { isLoggedIn, user, token } = useSelector((state) => state.auth);

//   const linkClass =
//     "px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#82C600] hover:text-white transition";

//   const activeClass = "bg-[#82C600] text-white";

//   // Close profile dropdown
//   useEffect(() => {
//     const handler = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // 🔔 FETCH INVITATIONS (FIXED)
//   useEffect(() => {
//     const fetchInvitations = async () => {
//       try {
//         const res = await fetch(
//           "https://backend-ly6h.onrender.com/app/v1/Learn/get-invitation",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         const data = await res.json();

//         // ✅ FIXED HERE
//         if (Array.isArray(data)) {
//           setInvitations(data);
//         }
//       } catch (err) {
//         console.error("Error fetching invitations:", err);
//       }
//     };

//     if (isLoggedIn) {
//       fetchInvitations();
//     }
//   }, [isLoggedIn, token]);

//   // ✅ ACCEPT INVITE
//   const handleAccept = async (id) => {
//     try {
//       await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Learn/accept-invitation/${id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setInvitations((prev) => prev.filter((i) => i._id !== id));
//     } catch (err) {
//       console.error("Accept error:", err);
//     }
//   };

//   // ❌ REJECT INVITE
//   const handleReject = async (id) => {
//     try {
//       await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Learn/reject-invitation/${id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setInvitations((prev) => prev.filter((i) => i._id !== id));
//     } catch (err) {
//       console.error("Reject error:", err);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser());
//       setMenuOpen(false);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       <header className="w-full backdrop-blur-md bg-white/80 border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//           {/* LEFT */}
//           <div className="flex items-center gap-3">
//             <Link to="/" className="w-36 sm:w-42 md:w-56">
//               <img src={Desunlogo} alt="logo" />
//             </Link>
//           </div>

//           {/* CENTER */}
//           <nav className="hidden md:flex gap-3">
//             {["/", "/contest", "/contact", "/my-contests", "/winners"].map(
//               (path, i) => {
//                 const labels = [
//                   "Home",
//                   "Contests",
//                   "Contact",
//                   "My Contests",
//                   "Winners",
//                 ];
//                 return (
//                   <NavLink
//                     key={i}
//                     to={path}
//                     className={({ isActive }) =>
//                       isActive ? `${linkClass} ${activeClass}` : linkClass
//                     }
//                   >
//                     {labels[i]}
//                   </NavLink>
//                 );
//               },
//             )}
//           </nav>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">
//             <div className="hidden md:flex items-center gap-3">
//               {isLoggedIn ? (
//                 <div className="flex items-center gap-3">
//                   {/* 🔔 BELL */}
//                   <div className="relative">
//                     <FaBell
//                       onClick={() => setInviteModal(true)}
//                       className="text-xl cursor-pointer text-gray-700 hover:text-[#82C600]"
//                     />

//                     {invitations.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
//                         {invitations.length}
//                       </span>
//                     )}
//                   </div>

//                   {/* USER */}
//                   <div className="hidden sm:flex flex-col text-right">
//                     <span className="text-sm font-semibold text-gray-700">
//                       Hello, {user?.userName || "User"}
//                     </span>
//                     <span className="text-xs text-gray-500 truncate max-w-[150px]">
//                       {user?.email}
//                     </span>
//                   </div>

//                   {/* PROFILE */}
//                   <div className="relative" ref={profileRef}>
//                     <FaUserCircle
//                       onClick={() => setProfileOpen(!profileOpen)}
//                       className="text-3xl cursor-pointer text-gray-700 hover:text-[#82C600]"
//                     />

//                     {profileOpen && (
//                       <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border p-2">
//                         <Link
//                           to="/profile"
//                           className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
//                         >
//                           <FaUser /> Profile
//                         </Link>

//                         <Button
//                           text="Logout"
//                           variant="logout"
//                           onClick={handleLogout}
//                           icon={<FaSignOutAlt />}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <Link to="/login">
//                     <Button text="Login" variant="outline" />
//                   </Link>
//                   <Link to="/signup">
//                     <Button text="Sign Up" variant="gradient" />
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* MOBILE */}
//             <button
//               className="md:hidden text-xl"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* 🔔 MODAL */}
//       {inviteModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-xl p-5 relative">
//             <h2 className="text-lg font-semibold mb-4">
//               Invitations ({invitations.length})
//             </h2>

//             <button
//               onClick={() => setInviteModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>

//             <div className="max-h-[400px] overflow-y-auto space-y-3">
//               {invitations.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No invitations found</p>
//               ) : (
//                 invitations.map((invite) => (
//                   <div
//                     key={invite._id}
//                     className="p-3 border rounded-lg bg-gray-50"
//                   >
//                     {/* ✅ FIXED DATA */}
//                     <p className="text-sm font-medium">
//                       {invite?.team?.name || "Team Invitation"}
//                     </p>

//                     <p className="text-xs text-gray-500 mb-2">
//                       Invited by {invite?.sender?.userName || "Someone"}
//                     </p>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleAccept(invite._id)}
//                         className="px-3 py-1 text-xs bg-green-500 text-white rounded"
//                       >
//                         Accept
//                       </button>

//                       <button
//                         onClick={() => handleReject(invite._id)}
//                         className="px-3 py-1 text-xs bg-red-500 text-white rounded"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";
import HeaderUI from "../../ui/HeaderUI";
import { toast } from "react-toastify";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [inviteModal, setInviteModal] = useState(false);

  const profileRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user, token } = useSelector((state) => state.auth);

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

  // Fetch Invitations
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await fetch(
          "https://backend-ly6h.onrender.com/app/v1/Learn/get-invitation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setInvitations(data);
        }
      } catch (err) {
        console.error("Error fetching invitations:", err);
      }
    };

    if (isLoggedIn) {
      fetchInvitations();
    }
  }, [isLoggedIn, token]);

  // Accept
  const handleAccept = async (id) => {
    try {
      await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/accept-invitation/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Team created successfully!"); // ✅ added

      setInvitations((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  // Reject
  const handleReject = async (id) => {
    try {
      await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/reject-invitation/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.error("Team request rejected");

      setInvitations((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <HeaderUI
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      profileOpen={profileOpen}
      setProfileOpen={setProfileOpen}
      profileRef={profileRef}
      invitations={invitations}
      inviteModal={inviteModal}
      setInviteModal={setInviteModal}
      isLoggedIn={isLoggedIn}
      user={user}
      handleAccept={handleAccept}
      handleReject={handleReject}
      handleLogout={handleLogout}
    />
  );
};

export default Header;
