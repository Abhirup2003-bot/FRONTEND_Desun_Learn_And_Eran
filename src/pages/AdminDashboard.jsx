import React, { useState } from "react";
import { Menu } from "lucide-react";

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
  {
    id: 3,
    title: "Data Science Olympiad",
    participants: 125,
    status: "Active",
    deadline: "2024-10-21",
  },
];

export default function AdminDashboard() {
  const [contests, setContests] = useState(initialContests);
  const [form, setForm] = useState({ title: "", deadline: "" });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleEdit = (contest) => {
    setEditingId(contest.id);
    setForm({ title: contest.title, deadline: contest.deadline });
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
      <aside
        className={`bg-white w-64 p-4 shadow-lg fixed md:static z-20 h-full transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <SidebarItem label="Dashboard" />
          <SidebarItem label="Contests" active />
          <SidebarItem label="Users" />
          <SidebarItem label="Settings" />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-4 md:p-6">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
          <h1 className="text-2xl font-bold">Contest Management</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            + Create Contest
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Contests" value={contests.length} />
          <StatCard
            label="Total Participants"
            value={contests.reduce((a, c) => a + c.participants, 0)}
          />
          <StatCard
            label="Active Contests"
            value={contests.filter((c) => c.status === "Active").length}
          />
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-3">
            {editingId ? "Edit Contest" : "Create Contest"}
          </h2>
          <div className="flex gap-3 flex-col md:flex-row">
            <input
              className="border p-2 rounded w-full"
              placeholder="Contest Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
            {editingId ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Contest</th>
                <th>Status</th>
                <th>Participants</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.title}</td>
                  <td>{c.status}</td>
                  <td>{c.participants}</td>
                  <td>{c.deadline}</td>
                  <td className="flex gap-2 p-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, active }) {
  return (
    <div
      className={`p-2 rounded-lg cursor-pointer ${active ? "bg-green-100 text-green-700" : "hover:bg-gray-100"}`}
    >
      {label}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}
