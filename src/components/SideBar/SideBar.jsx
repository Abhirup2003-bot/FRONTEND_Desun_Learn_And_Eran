import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";
import { useState } from "react";
import Button from "../Button/Button";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Contests", path: "/admin/contest", icon: Trophy },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-gray-900 to-gray-950 text-white z-50 transition-all duration-300 shadow-xl
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            {!collapsed && <h2 className="text-lg font-bold">Admin Panel</h2>}

            <div className="flex items-center gap-2">
              {/* Collapse Button */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>

              {/* Close (mobile) */}
              <button
                className="md:hidden p-1 hover:bg-gray-700 rounded"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-indigo-600"
                      : "hover:bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={20} />

                  {/* Text (hidden when collapsed) */}
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}

                  {/* Tooltip (when collapsed) */}
                  {collapsed && (
                    <span className="absolute left-20 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile Section */}
          <div className="mt-auto">
            <div className="bg-gray-800/80 backdrop-blur rounded-xl p-3 w-full">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                  {user?.userName?.charAt(0).toUpperCase() || "A"}
                </div>

                {!collapsed && (
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate">
                      {user?.userName || "Admin"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email || "admin@email.com"}
                    </p>
                  </div>
                )}
              </div>

              {/* Logout Button FULL WIDTH */}
              {!collapsed && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg transition-all"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
