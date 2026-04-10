import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContestDetailsPageUi from "../ui/ContestDetailsPageUi";
import {
  getContest,
  participateInContest,
  clearMessage,
} from "../features/contestSlice/contestSlice";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const token = authState?.token || authState?.user?.token;

  const {
    contests = [],
    loading,
    error,
    message,
  } = useSelector((state) => state.contest);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  /* ================= FIND CONTEST ================= */
  const contestData = useMemo(() => {
    return contests.find((c) => String(c._id) === String(id));
  }, [contests, id]);

  /* ================= PARTICIPATION CHECK (FIXED) ================= */
  const userId = authState?.user?._id;

  console.log("👤 USER ID:", userId);
  console.log("📦 PARTICIPANTS RAW:", contestData?.participants);
  console.log("👥 TEAMS RAW:", contestData?.teams);

  const hasParticipated = useMemo(() => {
    if (!contestData || !userId) return false;

    const participants = contestData?.participants || [];
    const teams = contestData?.teams || [];

    // 🔥 FIX 1: handle both string + object participants
    const isInParticipants = participants.some((p) => {
      const pid = typeof p === "object" ? p?._id : p;
      return String(pid) === String(userId);
    });

    // 🔥 FIX 2: handle team members properly
    const isInTeam = teams.some((t) =>
      (t?.members || []).some((m) => {
        const mid = typeof m === "object" ? m?._id : m;
        return String(mid) === String(userId);
      }),
    );

    const result = isInParticipants || isInTeam;

    console.log("🔥 FINAL HAS PARTICIPATED:", result);

    return result;
  }, [contests, id, authState?.user?._id]);
  /* ================= PARTICIPATE ================= */
  const handleParticipate = async (teamData = null) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const type = contestData?.participationType?.toLowerCase() || "solo";

    try {
      let teamId = null;

      if (type === "team") {
        if (!teamData) {
          alert("This contest requires a team.");
          return;
        }

        const teamRes = await fetch(
          "https://backend-ly6h.onrender.com/app/v1/Learn/team-making",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: teamData.teamName,
              members: teamData.members,
            }),
          },
        );

        const teamDataRes = await teamRes.json();

        if (!teamRes.ok) {
          alert(teamDataRes.msg || "Team creation failed");
          return;
        }

        teamId = teamDataRes.data._id;
      }

      await dispatch(
        participateInContest({
          contestId: contestData._id,
          token,
          teamId,
        }),
      ).unwrap();

      console.log("🔄 REFRESHING CONTEST AFTER JOIN...");

      await dispatch(getContest());
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ================= SUBMIT PROJECT ================= */
  const handleSubmitProject = async (teamName, githubLink, liveLink) => {
    try {
      const isTeam = contestData?.participationType?.toLowerCase() === "team";

      const url = isTeam
        ? `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-team/${id}`
        : `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-solo/${id}`;

      const payload = isTeam
        ? { teamName, githubLink, liveLink }
        : { githubLink, liveLink };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Submission failed");
        return;
      }

      alert(data.msg || "Submitted successfully");

      // 🔥 ADD THIS
      dispatch(getContest());
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ================= ALERTS ================= */
  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearMessage());
    }
  }, [error, dispatch]);

  if (loading && contests.length === 0) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!contestData) {
    return <div className="p-10 text-center">Contest not found</div>;
  }

  return (
    <ContestDetailsPageUi
      data={contestData}
      onParticipate={handleParticipate}
      onSubmitProject={handleSubmitProject}
      loading={loading}
    />
  );
};

export default ContestDetailsPage;
