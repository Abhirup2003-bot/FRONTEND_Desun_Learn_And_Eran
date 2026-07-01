// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   Home,
// //   Users,
// //   Trophy,
// //   X,
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logoutUser } from "../../features/authSlice/authSlice";
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FaSignOutAlt } from "react-icons/fa";

// // function Sidebar({ open, setOpen }) {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const { user } = useSelector((state) => state.auth);

// //   // 🔥 STATE
// //   const [collapsed, setCollapsed] = useState(true);
// //   const [hovered, setHovered] = useState(false);

// //   const isExpanded = !collapsed || hovered;

// //   const menuItems = [
// //     { name: "Dashboard", path: "/admin/dashboard", icon: Home },
// //     { name: "Users", path: "/admin/users", icon: Users },
// //     { name: "Contests", path: "/admin/contest", icon: Trophy },
// //   ];

// //   const handleLogout = () => {
// //     dispatch(logoutUser());
// //     navigate("/login");
// //   };

// //   return (
// //     <>
// //       {/* 🔥 MOBILE OVERLAY */}
// //       <AnimatePresence>
// //         {open && (
// //           <motion.div
// //             className="fixed inset-0 bg-black/50 z-40 md:hidden"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setOpen(false)}
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* 🔥 SIDEBAR */}
// //       <motion.aside
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //         animate={{ width: isExpanded ? 260 : 80 }}
// //         transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //         className={`
// //           h-screen text-white shadow-2xl
// //           bg-gradient-to-b from-gray-900 via-gray-950 to-black
// //           border-r border-gray-800

// //           flex flex-col

// //           fixed top-0 left-0 z-50

// //           transition-transform duration-300

// //           md:translate-x-0
// //           ${open ? "translate-x-0" : "-translate-x-full"}
// //         `}
// //         style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}
// //       >
// //         <div className="flex flex-col h-full p-4">
// //           {/* 🔷 HEADER */}
// //           <div className="flex justify-between items-center mb-8">
// //             {isExpanded && (
// //               <motion.h2
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
// //               >
// //                 Admin Panel
// //               </motion.h2>
// //             )}

// //             <div className="flex gap-2">
// //               {/* Collapse toggle */}
// //               <button
// //                 onClick={() => setCollapsed(!collapsed)}
// //                 className="p-1 hover:bg-gray-800 rounded"
// //               >
// //                 {collapsed ? <ChevronRight /> : <ChevronLeft />}
// //               </button>

// //               {/* Mobile close */}
// //               <button
// //                 className="md:hidden p-1 hover:bg-gray-800 rounded"
// //                 onClick={() => setOpen(false)}
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* 🔷 MENU */}
// //           <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
// //             {menuItems.map((item) => {
// //               const Icon = item.icon;
// //               const isActive = location.pathname === item.path;

// //               return (
// //                 <Link
// //                   key={item.name}
// //                   to={item.path}
// //                   onClick={() => setOpen(false)}
// //                   className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
// //                   ${
// //                     isActive
// //                       ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
// //                       : "hover:bg-gray-800 text-gray-400 hover:text-white"
// //                   }`}
// //                 >
// //                   <Icon size={20} className="opacity-90" />

// //                   {isExpanded && (
// //                     <motion.span
// //                       initial={{ opacity: 0, x: -10 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       className="text-sm"
// //                     >
// //                       {item.name}
// //                     </motion.span>
// //                   )}

// //                   {!isExpanded && (
// //                     <span className="absolute left-16 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
// //                       {item.name}
// //                     </span>
// //                   )}
// //                 </Link>
// //               );
// //             })}
// //           </nav>

// //           {/* 🔷 PROFILE */}
// //           <div className="mt-auto">
// //             <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 shadow-inner">
// //               <div className="flex items-center gap-3 mb-3">
// //                 <img
// //                   src={`https://ui-avatars.com/api/?name=${user?.userName || "Admin"}`}
// //                   className="w-10 h-10 rounded-full"
// //                 />

// //                 {isExpanded && (
// //                   <div>
// //                     <p className="text-sm font-semibold">
// //                       {user?.userName || "Admin"}
// //                     </p>
// //                     <p className="text-xs text-gray-400">{user?.email}</p>
// //                   </div>
// //                 )}
// //               </div>

// //               {isExpanded && (
// //                 <button
// //                   onClick={handleLogout}
// //                   className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition-all"
// //                 >
// //                   <FaSignOutAlt />
// //                   Logout
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </motion.aside>
// //     </>
// //   );
// // }

// // export default Sidebar;

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Home,
//   Users,
//   Trophy,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   UsersRound, // ⭐ NEW ICON FOR TEAMS
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../../features/authSlice/authSlice";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaSignOutAlt } from "react-icons/fa";

// function Sidebar({ open, setOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   const [collapsed, setCollapsed] = useState(true);
//   const [hovered, setHovered] = useState(false);

//   const isExpanded = !collapsed || hovered;

//   // ✅ UPDATED MENU (TEAMS ADDED)
//   const menuItems = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: Home },
//     { name: "Users", path: "/admin/users", icon: Users },
//     { name: "Teams", path: "/admin/teams", icon: UsersRound }, // ⭐ NEW
//     { name: "Contests", path: "/admin/contest", icon: Trophy },
//   ];

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 z-40 md:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* SIDEBAR */}
//       <motion.aside
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         animate={{ width: isExpanded ? 260 : 80 }}
//         transition={{ type: "spring", stiffness: 200, damping: 20 }}
//         className={`
//           h-screen text-white shadow-2xl
//           bg-gradient-to-b from-gray-900 via-gray-950 to-black
//           border-r border-gray-800
//           flex flex-col
//           fixed top-0 left-0 z-50
//           md:translate-x-0
//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
//         style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}
//       >
//         <div className="flex flex-col h-full p-4">
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-8">
//             {isExpanded && (
//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
//               >
//                 Admin Panel
//               </motion.h2>
//             )}

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="p-1 hover:bg-gray-800 rounded"
//               >
//                 {collapsed ? <ChevronRight /> : <ChevronLeft />}
//               </button>

//               <button
//                 className="md:hidden p-1 hover:bg-gray-800 rounded"
//                 onClick={() => setOpen(false)}
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>

//           {/* MENU */}
//           <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.path;

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setOpen(false)}
//                   className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
//                   ${
//                     isActive
//                       ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
//                       : "hover:bg-gray-800 text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   <Icon size={20} className="opacity-90" />

//                   {isExpanded && (
//                     <motion.span
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       className="text-sm"
//                     >
//                       {item.name}
//                     </motion.span>
//                   )}

//                   {!isExpanded && (
//                     <span className="absolute left-16 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                       {item.name}
//                     </span>
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* PROFILE */}
//           <div className="mt-auto">
//             <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 shadow-inner">
//               <div className="flex items-center gap-3 mb-3">
//                 <img
//                   src={`https://ui-avatars.com/api/?name=${user?.userName || "Admin"}`}
//                   className="w-10 h-10 rounded-full"
//                 />

//                 {isExpanded && (
//                   <div>
//                     <p className="text-sm font-semibold">
//                       {user?.userName || "Admin"}
//                     </p>
//                     <p className="text-xs text-gray-400">{user?.email}</p>
//                   </div>
//                 )}
//               </div>

//               {isExpanded && (
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition-all"
//                 >
//                   <FaSignOutAlt />
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.aside>
//     </>
//   );
// }

// export default Sidebar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  UsersRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";
import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);

  const isExpanded = !collapsed || hovered;

  // ✅ ONLY UPDATE: Submissions added
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Teams", path: "/admin/teams", icon: UsersRound },
    { name: "Contests", path: "/admin/contest", icon: Trophy },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && (
          <Motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <Motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: isExpanded ? 260 : 80 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`
          h-screen text-white shadow-2xl
          bg-gradient-to-b from-gray-900 via-gray-950 to-black
          border-r border-gray-800
          flex flex-col
          fixed top-0 left-0 z-50
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}
      >
        <div className="flex flex-col h-full p-4">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            {isExpanded && (
              <Motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                Admin Panel
              </Motion.h2>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 hover:bg-gray-800 rounded"
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>

              <button
                className="md:hidden p-1 hover:bg-gray-800 rounded"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
                      : "hover:bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="opacity-90" />

                  {isExpanded && (
                    <Motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm"
                    >
                      {item.name}
                    </Motion.span>
                  )}

                  {!isExpanded && (
                    <span className="absolute left-16 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* PROFILE */}
          <div className="mt-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 shadow-inner">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    user?.userName || "Admin"
                  }`}
                  className="w-10 h-10 rounded-full"
                />

                {isExpanded && (
                  <div>
                    <p className="text-sm font-semibold">
                      {user?.userName || "Admin"}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                )}
              </div>

              {isExpanded && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg transition-all"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </Motion.aside>
    </>
  );
}

export default Sidebar;
