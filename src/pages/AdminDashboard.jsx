import React, { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";
import { Search, Menu } from "lucide-react";

const initialContests = [
  {
    id: 1,
    title: "Global Algorithm",
    description: "Solve advanced algorithmic problems",
    difficulty: "Hard",
    participants: 420,
    status: "Active",
    deadline: "2024-10-21",
    reward: "$500",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contests, setContests] = useState(initialContests);
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    deadline: "",
    reward: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleCreate = () => {
    if (!form.title) return;
    const newContest = {
      id: Date.now(),
      ...form,
      participants: 0,
      status: "Draft",
    };
    setContests([newContest, ...contests]);
    resetForm();
  };

  const handleDelete = (id) => {
    setContests(contests.filter((c) => c.id !== id));
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm(c);
  };

  const handleUpdate = () => {
    setContests(
      contests.map((c) => (c.id === editingId ? { ...c, ...form } : c)),
    );
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      difficulty: "Easy",
      deadline: "",
      reward: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-xl w-1/3">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search contests..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Contest Management</h2>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
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
          <div className="bg-white p-6 rounded-2xl shadow mb-6 space-y-4">
            <h3 className="font-semibold text-lg">
              {editingId ? "Edit Contest" : "Create Contest"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border p-3 rounded-xl"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <select
                className="border p-3 rounded-xl"
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: e.target.value })
                }
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <input
                type="date"
                className="border p-3 rounded-xl"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />

              <input
                className="border p-3 rounded-xl"
                placeholder="Reward"
                value={form.reward}
                onChange={(e) => setForm({ ...form, reward: e.target.value })}
              />
            </div>

            <textarea
              className="border p-3 rounded-xl w-full"
              placeholder="Description / Project Brief"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
              >
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="bg-gray-300 px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Contest</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Deadline</th>
                  <th>Reward</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contests.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <p className="font-medium">{c.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {c.description}
                      </p>
                    </td>

                    <td>{c.difficulty}</td>

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
                    <td>{c.reward}</td>

                    <td className="flex gap-2 p-2">
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
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
