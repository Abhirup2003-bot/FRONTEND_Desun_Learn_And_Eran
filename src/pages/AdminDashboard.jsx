import React, { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";
import { Bell, Search, Menu } from "lucide-react";

const initialContests = [
  {
    id: 1,
    title: "Global Algorithm",
    participants: 420,
    status: "Active",
    deadline: "2024-10-21",
  },
  {
    id: 2,
    title: "UI/UX Innovation",
    participants: 0,
    status: "Draft",
    deadline: "2024-11-14",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contests, setContests] = useState(initialContests);
  const [form, setForm] = useState({ title: "", deadline: "" });
  const [editingId, setEditingId] = useState(null);

  const handleCreate = () => {
    if (!form.title) return;
    const newContest = {
      id: Date.now(),
      title: form.title,
      participants: 0,
      status: "Draft",
      deadline: form.deadline,
    };
    setContests([newContest, ...contests]);
    setForm({ title: "", deadline: "" });
  };

  const handleDelete = (id) => {
    setContests(contests.filter((c) => c.id !== id));
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm({ title: c.title, deadline: c.deadline });
  };

  const handleUpdate = () => {
    setContests(
      contests.map((c) =>
        c.id === editingId
          ? { ...c, title: form.title, deadline: form.deadline }
          : c,
      ),
    );
    setEditingId(null);
    setForm({ title: "", deadline: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 flex-1">
          <h1 className="text-2xl font-bold mb-6">Contest Management</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Contests" value={contests.length} />
            <StatCard
              label="Participants"
              value={contests.reduce((a, c) => a + c.participants, 0)}
            />
            <StatCard
              label="Active"
              value={contests.filter((c) => c.status === "Active").length}
            />
          </div>

          {/* Form */}
          <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
            <div className="flex gap-3 flex-col md:flex-row">
              <input
                className="border p-2 rounded-lg w-full"
                placeholder="Contest Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="date"
                className="border p-2 rounded-lg"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Contest</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contests.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{c.title}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.participants}</td>
                    <td>{c.deadline}</td>
                    <td className="flex gap-5 p-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
