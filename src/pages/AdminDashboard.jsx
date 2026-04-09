import React, { useEffect, useState } from "react";
import { Search, Menu, Trophy, Users, FileText, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { contests, loading } = useSelector((state) => state.contest);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ FETCH DATA
  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  // ✅ METRICS (safe fallback)
  const totalContests = contests?.length || 0;

  const totalParticipants =
    contests?.reduce((acc, c) => acc + (c.participants?.length || 0), 0) || 0;

  const totalSubmissions =
    contests?.reduce((acc, c) => acc + (c.submissions || 0), 0) || 0;

  const pendingEvaluations =
    contests?.reduce((acc, c) => acc + (c.pending || 0), 0) || 0;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <div className="flex-1 flex flex-col">
        {/* 🔷 HEADER */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b shadow-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
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

        {/* 🔷 MAIN */}
        <main className="p-6 space-y-8">
          {/* ✅ STATS */}
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              label="Total Contests"
              value={totalContests}
              icon={<Trophy />}
              color="from-indigo-500 to-indigo-700"
            />
            <StatCard
              label="Participants"
              value={totalParticipants}
              icon={<Users />}
              color="from-green-500 to-green-700"
            />
            <StatCard
              label="Submissions"
              value={totalSubmissions}
              icon={<FileText />}
              color="from-purple-500 to-purple-700"
            />
            <StatCard
              label="Pending"
              value={pendingEvaluations}
              icon={<Clock />}
              color="from-red-500 to-red-700"
            />
          </div>

          {/* ✅ CONTEST LIST */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              All Contests
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading contests...</p>
            ) : contests?.length === 0 ? (
              <p className="text-gray-500">No contests found</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {contests.map((contest) => (
                  <div
                    key={contest._id}
                    className="relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* 🔥 IMAGE */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={contest.image || "https://via.placeholder.com/400"}
                        alt={contest.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />

                      {/* TYPE BADGE */}
                      <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                        {contest.type}
                      </span>
                    </div>

                    {/* 🔥 CONTENT */}
                    <div className="p-5 space-y-3">
                      {/* TITLE */}
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">
                        {contest.title}
                      </h3>

                      {/* BRIEF */}
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {contest.brief}
                      </p>

                      {/* DESCRIPTION */}
                      <p className="text-xs text-gray-400 line-clamp-3">
                        {contest.description}
                      </p>

                      {/* DATES */}
                      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                        <div>
                          <p className="font-medium text-gray-600">Start</p>
                          <p>
                            {contest.startingDate
                              ? new Date(
                                  contest.startingDate,
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-gray-600">Deadline</p>
                          <p>
                            {contest.deadline
                              ? new Date(contest.deadline).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* EXTRA */}
                      <div className="flex justify-between items-center pt-3">
                        {/* PRIZE */}
                        <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          🎁 {contest.prizes || "No Prize"}
                        </div>

                        {/* STATUS */}
                        <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                          {contest.type || "Unknown"}
                        </div>
                      </div>
                    </div>

                    {/* HOVER BORDER */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-400 transition"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* 🔷 STAT CARD */
function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold mt-1 text-gray-800">{value}</h2>
      </div>

      <div
        className={`bg-gradient-to-r ${color} text-white p-3 rounded-xl shadow`}
      >
        {icon}
      </div>
    </div>
  );
}
