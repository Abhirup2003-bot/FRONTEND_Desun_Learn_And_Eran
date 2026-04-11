import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";
import AdminDashboardUI from "../ui/AdminDashboardUI";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { contests, loading } = useSelector((state) => state.contest);
  const { token } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [participantsData, setParticipantsData] = useState({});
  const [participantsLoading, setParticipantsLoading] = useState(false);

  // FETCH CONTESTS
  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  // FETCH PARTICIPANTS
  useEffect(() => {
    if (!contests?.length || !token) return;

    const fetchParticipants = async () => {
      try {
        setParticipantsLoading(true);

        const BASE_URL = "https://backend-ly6h.onrender.com/app/v1/Admin";

        const requests = contests.map((contest) =>
          fetch(`${BASE_URL}/contest/${contest._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              // console.log("Contest API response", contest._id, res);
              // Adjust this if API structure changes
              return res?.data?.data || res?.data || [];
            })
            .catch(() => []),
        );

        const responses = await Promise.all(requests);

        const mapped = {};
        contests.forEach((contest, index) => {
          mapped[contest._id] = responses[index] || [];
        });

        setParticipantsData(mapped);
      } catch (err) {
        console.error("Participant fetch error", err);
      } finally {
        setParticipantsLoading(false);
      }
    };

    fetchParticipants();
  }, [contests, token]);

  // METRICS
  const totalContests = contests?.length || 0;

  const totalTeamParticipants = contests.reduce((acc, contest) => {
    const mode =
      contest.participationType?.toLowerCase() ||
      (contest.maxTeamSize > 1 ? "team" : "solo");

    if (mode === "team") {
      return acc + (participantsData[contest._id]?.length || 0);
    }
    return acc;
  }, 0);

  const totalSoloParticipants = contests.reduce((acc, contest) => {
    const mode =
      contest.participationType?.toLowerCase() ||
      (contest.maxTeamSize === 1 ? "solo" : "team");

    if (mode === "solo") {
      return acc + (participantsData[contest._id]?.length || 0);
    }
    return acc;
  }, 0);

  const totalSubmissions =
    contests?.reduce((acc, c) => acc + (c.submissions || 0), 0) || 0;

  const pendingEvaluations =
    contests?.reduce((acc, c) => acc + (c.pending || 0), 0) || 0;

  return (
    <AdminDashboardUI
      contests={contests}
      loading={loading}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      participantsLoading={participantsLoading}
      participantsData={participantsData}
      metrics={{
        totalContests,
        totalTeamParticipants,
        totalSoloParticipants,
        totalSubmissions,
        pendingEvaluations,
      }}
    />
  );
}
