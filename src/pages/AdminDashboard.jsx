// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getContest } from "../features/contestSlice/contestSlice";
// import AdminDashboardUI from "../ui/AdminDashboardUI";

// export default function AdminDashboard() {
//   const dispatch = useDispatch();

//   const { contests, loading } = useSelector((state) => state.contest);
//   const { token } = useSelector((state) => state.auth);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [participantsData, setParticipantsData] = useState({});
//   const [participantsLoading, setParticipantsLoading] = useState(false);

//   const [teamsData, setTeamsData] = useState([]);
//   const [teamsLoading, setTeamsLoading] = useState(false);

//   // FETCH CONTESTS
//   useEffect(() => {
//     dispatch(getContest());
//   }, [dispatch]);

//   // FETCH PARTICIPANTS (UNCHANGED + DEBUG)
//   useEffect(() => {
//     if (!contests?.length || !token) return;

//     const fetchParticipants = async () => {
//       try {
//         setParticipantsLoading(true);

//         const BASE_URL = "https://backend-ly6h.onrender.com/app/v1/Admin";

//         const requests = contests.map((contest) =>
//           fetch(`${BASE_URL}/contest/${contest._id}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           })
//             .then((res) => res.json())
//             .then((res) => {
//               console.log("📦 Contest API Raw:", contest._id, res);

//               const parsed = res?.data?.data || res?.data || [];

//               console.log("✅ Parsed Participants:", parsed);

//               return parsed;
//             })
//             .catch((err) => {
//               console.error("❌ Contest API Error:", contest._id, err);
//               return [];
//             }),
//         );

//         const responses = await Promise.all(requests);

//         console.log("📊 All Participants:", responses);

//         const mapped = {};
//         contests.forEach((contest, index) => {
//           mapped[contest._id] = responses[index] || [];
//         });

//         console.log("🧠 Final Mapping:", mapped);

//         setParticipantsData(mapped);
//       } catch (err) {
//         console.error("❌ Participant fetch error", err);
//       } finally {
//         setParticipantsLoading(false);
//       }
//     };

//     fetchParticipants();
//   }, [contests, token]);

//   // FETCH TEAMS (NEW + DEBUG)
//   useEffect(() => {
//     if (!token) return;

//     const fetchTeams = async () => {
//       try {
//         setTeamsLoading(true);

//         const res = await fetch(
//           "https://backend-ly6h.onrender.com/app/v1/Admin/get-all-teams",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         const data = await res.json();

//         console.log("📦 Teams API Raw:", data);

//         const parsed = data?.data || [];

//         console.log("✅ Parsed Teams:", parsed);

//         setTeamsData(parsed);
//       } catch (err) {
//         console.error("❌ Teams fetch error", err);
//       } finally {
//         setTeamsLoading(false);
//       }
//     };

//     fetchTeams();
//   }, [token]);

//   // METRICS
//   const totalContests = contests?.length || 0;

//   const totalTeamParticipants = contests.reduce((acc, contest) => {
//     const mode =
//       contest.participationType?.toLowerCase() ||
//       (contest.maxTeamSize > 1 ? "team" : "solo");

//     if (mode === "team") {
//       return acc + (participantsData[contest._id]?.length || 0);
//     }
//     return acc;
//   }, 0);

//   const totalSoloParticipants = contests.reduce((acc, contest) => {
//     const mode =
//       contest.participationType?.toLowerCase() ||
//       (contest.maxTeamSize === 1 ? "solo" : "team");

//     if (mode === "solo") {
//       return acc + (participantsData[contest._id]?.length || 0);
//     }
//     return acc;
//   }, 0);

//   const totalSubmissions =
//     contests?.reduce((acc, c) => acc + (c.submissions || 0), 0) || 0;

//   const pendingEvaluations =
//     contests?.reduce((acc, c) => acc + (c.pending || 0), 0) || 0;

//   return (
//     <AdminDashboardUI
//       contests={contests}
//       loading={loading}
//       sidebarOpen={sidebarOpen}
//       setSidebarOpen={setSidebarOpen}
//       participantsLoading={participantsLoading}
//       participantsData={participantsData}
//       teamsData={teamsData}
//       teamsLoading={teamsLoading}
//       metrics={{
//         totalContests,
//         totalTeamParticipants,
//         totalSoloParticipants,
//         totalSubmissions,
//         pendingEvaluations,
//       }}
//     />
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";
import AdminDashboardUI from "../ui/AdminDashboardUI";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { contests, loading } = useSelector((state) => state.contest);
  const { token } = useSelector((state) => state.auth);

  const [participantsData, setParticipantsData] = useState({});
  const [teamsData, setTeamsData] = useState([]);
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    const fetchTeams = async () => {
      try {
        const res = await fetch(
          "https://backend-ly6h.onrender.com/app/v1/Admin/get-all-teams",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();
        setTeamsData(data?.data || []);
      } catch (err) {
        console.error("❌ Teams Error:", err);
        setTeamsData([]);
      }
    };

    fetchTeams();
  }, [token]);

  useEffect(() => {
    if (!contests?.length || !token) return;

    const BASE = "https://backend-ly6h.onrender.com/app/v1/Admin";

    const fetchAll = async () => {
      const participantsMap = {};
      const projectsMap = {};

      await Promise.all(
        contests.map(async (contest) => {
          const id = contest?._id;
          if (!id) return;

          try {
            const pRes = await fetch(`${BASE}/contest/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const pData = await pRes.json();

            participantsMap[id] =
              pData?.data?.data || pData?.data || pData?.participants || [];

            const projRes = await fetch(`${BASE}/get-all-projects/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const projData = await projRes.json();

            projectsMap[id] = projData?.mag || [];
          } catch {
            participantsMap[id] = [];
            projectsMap[id] = [];
          }
        }),
      );

      setParticipantsData({ ...participantsMap });
      setProjectsData({ ...projectsMap });
    };

    fetchAll();
  }, [contests, token]);

  const totalTeams = teamsData?.length || 0;

  // ✅ ALL participants (solo + team members)
  const totalParticipants = Object.values(participantsData || {}).flat().length;

  const totalSubmissions = Object.values(projectsData || {}).flat().length;

  return (
    <AdminDashboardUI
      contests={contests}
      loading={loading}
      participantsData={participantsData}
      teamsData={teamsData}
      projectsData={projectsData}
      metrics={{
        totalContests: contests?.length || 0,
        totalTeams,
        totalParticipants, // ✅ FIXED
        totalSubmissions,
      }}
    />
  );
}
