import React, { useState } from "react";
import { Search, Menu, Trophy, Users, FileText, Clock } from "lucide-react";

const initialContests = [
  {
    id: 1,
    participants: 420,
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contests] = useState(initialContests);

  // Metrics
  const totalParticipants = contests.reduce((a, c) => a + c.participants, 0);
  const totalSubmissions = totalParticipants * 2;
  const pendingEvaluations = Math.floor(totalSubmissions * 0.3);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
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
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>
        </header>

        {/* Main */}
        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              label="Total Contests"
              value={contests.length}
              icon={<Trophy />}
              color="bg-indigo-500"
            />
            <StatCard
              label="Total Participants"
              value={totalParticipants}
              icon={<Users />}
              color="bg-green-500"
            />
            <StatCard
              label="Submissions"
              value={totalSubmissions}
              icon={<FileText />}
              color="bg-purple-500"
            />
            <StatCard
              label="Pending Evaluations"
              value={pendingEvaluations}
              icon={<Clock />}
              color="bg-red-500"
            />
          </div>

          {/* Submissions Overview */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4">Submissions Overview</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <MiniStat
                label="Approved"
                value={Math.floor(totalSubmissions * 0.5)}
              />
              <MiniStat label="Pending" value={pendingEvaluations} />
              <MiniStat
                label="Rejected"
                value={Math.floor(totalSubmissions * 0.2)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Stat Card */
function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
      <div className={`${color} text-white p-3 rounded-xl`}>{icon}</div>
    </div>
  );
}

/* Mini Stat */
function MiniStat({ label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}
