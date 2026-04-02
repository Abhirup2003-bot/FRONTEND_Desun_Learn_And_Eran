import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Trophy, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";
import { useState } from "react";
import Button from "../Button/Button";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Contests", path: "/admin/contests", icon: Trophy },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-white z-50 transform transition-transform duration-300 shadow-xl
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>

            <button
              className="md:hidden p-1 hover:bg-gray-700 rounded"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 shadow-md"
                      : "hover:bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Profile / Logout Section */}
          <div className="mt-auto">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex flex-col gap-3 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {user?.userName || "Admin"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.email || "admin@email.com"}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                text="Logout"
                variant="danger"
                onClick={handleLogout}
                icon={<FaSignOutAlt />}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
