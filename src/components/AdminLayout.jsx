import { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <h1 className="font-semibold text-lg">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
