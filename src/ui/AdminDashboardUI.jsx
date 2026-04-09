import React, { useState } from "react";
import { Search, Menu, Trophy, Users, FileText, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardUI({
  contests,
  loading,
  sidebarOpen,
  setSidebarOpen,
  metrics,
  participantsData,
}) {
  const [selectedContest, setSelectedContest] = useState(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <div className="flex-1 flex flex-col">
        {/* 🔷 HEADER */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
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
          <div className="grid md:grid-cols-5 gap-6">
            <StatCard
              label="Contests"
              value={metrics.totalContests}
              icon={<Trophy />}
            />
            <StatCard
              label="Team"
              value={metrics.totalTeamParticipants}
              icon={<Users />}
            />
            <StatCard
              label="Solo"
              value={metrics.totalSoloParticipants}
              icon={<Users />}
            />
            <StatCard
              label="Submissions"
              value={metrics.totalSubmissions}
              icon={<FileText />}
            />
            <StatCard
              label="Pending"
              value={metrics.pendingEvaluations}
              icon={<Clock />}
            />
          </div>

          {/* ✅ CONTEST LIST */}
          {loading ? (
            <p className="text-gray-500 animate-pulse">Loading...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {contests.map((contest, i) => (
                <motion.div
                  key={contest._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedContest(contest)}
                  className="cursor-pointer bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={contest.image || "https://via.placeholder.com/400"}
                      alt={contest.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-lg">{contest.title}</h3>

                    <p className="text-xs text-gray-500">{contest.type}</p>

                    <div className="flex justify-between">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                        {contest.participationType ||
                          (contest.maxTeamSize > 1 ? "Team" : "Solo")}
                      </span>

                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        👥 {participantsData[contest._id]?.length || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selectedContest && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelectedContest(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">
                {selectedContest.title} Participants
              </h2>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {(participantsData[selectedContest._id] || []).length === 0 ? (
                  <p className="text-gray-500 text-sm">No participants yet</p>
                ) : (
                  participantsData[selectedContest._id].map((p, index) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg"
                    >
                      {/* 🧑 AVATAR */}
                      <img
                        src={
                          p.user?.avatar ||
                          `https://ui-avatars.com/api/?name=${p.user?.name || "User"}`
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />

                      {/* 👤 NAME */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {p.user?.name || "Unknown User"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {p.user?.email || ""}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 🔷 STAT CARD */
function StatCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-xl">
        {icon}
      </div>
    </motion.div>
  );
}
