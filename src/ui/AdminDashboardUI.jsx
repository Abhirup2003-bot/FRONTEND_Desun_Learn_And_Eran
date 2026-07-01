// import React, { useState } from "react";
// import { Trophy, Users, FileText, Clock, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AdminDashboardUI({
//   contests,
//   loading,
//   metrics,
//   participantsData,
//   teamsData,
// }) {
//   const [selectedContest, setSelectedContest] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
//       <div className="p-4 sm:p-6 lg:p-8 space-y-10">
//         {/* HEADER */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Manage contests, teams & participants
//           </p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <StatCard
//             label="Contests"
//             value={metrics.totalContests}
//             icon={<Trophy />}
//           />
//           <StatCard
//             label="Teams"
//             value={metrics.totalTeamParticipants}
//             icon={<Users />}
//           />
//           <StatCard
//             label="Solo"
//             value={metrics.totalSoloParticipants}
//             icon={<Users />}
//           />
//           <StatCard
//             label="Submissions"
//             value={metrics.totalSubmissions}
//             icon={<FileText />}
//           />
//           <StatCard
//             label="Pending"
//             value={metrics.pendingEvaluations}
//             icon={<Clock />}
//           />
//         </div>

//         {/* CONTEST LIST */}
//         {loading ? (
//           <p className="text-gray-400 animate-pulse">Loading contests...</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {contests.map((contest, i) => (
//               <motion.div
//                 key={contest._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 whileHover={{ y: -6, scale: 1.02 }}
//                 onClick={() => setSelectedContest(contest)}
//                 className="group cursor-pointer rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition"
//               >
//                 {/* IMAGE */}
//                 <div className="h-40 overflow-hidden">
//                   <img
//                     src={contest.image || "https://via.placeholder.com/400"}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5 space-y-3">
//                   <h3 className="font-semibold text-lg">{contest.title}</h3>

//                   <p className="text-xs text-gray-500">{contest.type}</p>

//                   <div className="flex justify-between items-center">
//                     <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
//                       {contest.participationType || "Team"}
//                     </span>

//                     <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
//                       👥 {participantsData[contest._id]?.length || 0}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {selectedContest && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 40 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 40 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">{selectedContest.title}</h2>
//                 <button
//                   onClick={() => setSelectedContest(null)}
//                   className="p-2 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <X />
//                 </button>
//               </div>

//               {/* PARTICIPANTS */}
//               <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
//                 {(participantsData[selectedContest._id] || []).length === 0 ? (
//                   <p className="text-gray-500 text-sm">No participants yet</p>
//                 ) : (
//                   participantsData[selectedContest._id].map((p, i) => {
//                     const user = p.user || {};

//                     const team = teamsData.find(
//                       (t) => t._id === p.teamName || t._id === p.team?._id,
//                     );

//                     console.log("👤 Participant:", p);
//                     console.log("👥 Team:", team);

//                     return (
//                       <div
//                         key={i}
//                         className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
//                       >
//                         {/* USER */}
//                         <div>
//                           <p className="font-medium">
//                             👤 {user.userName || "Unknown"}
//                           </p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>

//                         {/* TEAM */}
//                         {team && (
//                           <div className="bg-white rounded-lg p-3 border border-gray-200">
//                             <p className="text-sm text-indigo-600 font-semibold mb-2">
//                               🏷️ {team.name}
//                             </p>

//                             <div className="space-y-1">
//                               {team.members?.map((m, idx) => (
//                                 <p key={idx} className="text-xs text-gray-600">
//                                   • {m.userName || m.email}
//                                 </p>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* PREMIUM STAT CARD */
// function StatCard({ label, value, icon }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.04 }}
//       className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-lg transition"
//     >
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-xs text-gray-500">{label}</p>
//           <h2 className="text-xl font-bold">{value}</h2>
//         </div>

//         <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow">
//           {icon}
//         </div>
//       </div>

//       {/* subtle hover glow */}
//       <div className="absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-r from-indigo-400 to-purple-400 transition" />
//     </motion.div>
//   );
// }

import React, { useState } from "react";
import { Trophy, Users, FileText, X } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardUI({
  contests,
  loading,
  metrics,
  participantsData,
  teamsData,
}) {
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      <div className="p-4 sm:p-6 lg:p-8 space-y-10">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage contests, teams & participants
          </p>
        </div>

        {/* STATS (SOLO REMOVED) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard
            label="Contests"
            value={metrics.totalContests}
            icon={<Trophy />}
          />
          <StatCard label="Teams" value={metrics.totalTeams} icon={<Users />} />
          <StatCard
            label="Participants"
            value={metrics.totalParticipants}
            icon={<Users />}
          />
          <StatCard
            label="Submissions"
            value={metrics.totalSubmissions}
            icon={<FileText />}
          />
        </div>

        {/* CONTEST LIST */}
        {loading ? (
          <div className="text-gray-400 animate-pulse">Loading contests...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest, i) => (
              <Motion.div
                key={contest._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedContest(contest)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={contest.image || "https://via.placeholder.com/400"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {contest.title}
                  </h3>

                  <p className="text-xs text-gray-500">{contest.type}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {contest.participationType || "Team"}
                    </span>

                    <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                      👥 {participantsData[contest._id]?.length || 0}
                    </span>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedContest && (
          <Motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <Motion.div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{selectedContest.title}</h2>

                <button
                  onClick={() => setSelectedContest(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X />
                </button>
              </div>

              {/* PARTICIPANTS */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {(participantsData[selectedContest._id] || []).length === 0 ? (
                  <p className="text-gray-500 text-sm">No participants yet</p>
                ) : (
                  participantsData[selectedContest._id].map((p, i) => {
                    const team = teamsData.find(
                      (t) => t._id === p.teamName || t._id === p.team?._id,
                    );

                    return (
                      <div
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 hover:bg-gray-100 transition"
                      >
                        <div>
                          <h3 className="font-bold">Created By</h3>
                          <p className="font-medium">
                            👤 {p.team?.createdTeamBy?.userName || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.team?.createdTeamBy?.email}
                          </p>
                        </div>

                        {team && (
                          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                            <p className="text-sm text-indigo-600 font-semibold mb-2">
                              🏷️ {team.name}
                            </p>

                            <div className="space-y-1">
                              {team.members?.map((m, idx) => (
                                <p key={idx} className="text-xs text-gray-600">
                                  • {m.userName || m.email}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                {/* SUBMISSION BUTTON */}
                <div className="mb-4 flex justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/submissions/${selectedContest._id}`)
                    }
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    View Submissions
                  </button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* PREMIUM STAT CARD */
function StatCard({ label, value, icon }) {
  return (
    <Motion.div
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <h2 className="text-xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow">
          {icon}
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-r from-indigo-200 to-blue-200 transition" />
    </Motion.div>
  );
}
