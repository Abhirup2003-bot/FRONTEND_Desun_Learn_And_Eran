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
  const userId = authState?.user?._id;

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

  /* ================= NORMALIZE TYPE ================= */
  const participationType = useMemo(() => {
    return contestData?.participationType
      ? String(contestData.participationType).trim().toLowerCase()
      : "solo";
  }, [contestData]);

  /* ================= CHECK PARTICIPATION ================= */
  const hasParticipated = useMemo(() => {
    if (!contestData || !userId) return false;

    const participants = contestData?.participants || [];
    const teams = contestData?.teams || [];

    const inParticipants = participants.some((p) => {
      const pid = typeof p === "object" ? p?._id : p;
      return String(pid) === String(userId);
    });

    const inTeams = teams.some((t) =>
      (t?.members || []).some((m) => {
        const mid = typeof m === "object" ? m?._id : m;
        return String(mid) === String(userId);
      }),
    );

    return inParticipants || inTeams;
  }, [contestData, userId]);

  /* ================= PARTICIPATE ================= */
  const handleParticipate = async (teamData = null) => {
    console.log("🚀 ===== START PARTICIPATION =====");
    console.log("📌 Contest ID:", contestData?._id);
    console.log("📌 Type:", participationType);
    console.log("👤 User ID:", userId);
    console.log("📦 Team Data:", teamData);

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      let teamId = null;

      /* ================= TEAM FLOW ================= */
      if (participationType === "team") {
        if (!teamData) {
          alert("This contest requires a team.");
          return;
        }

        const teamPayload = {
          name: teamData.name,
          members: teamData.members,
          createdTeamBy: userId,
        };

        console.log("📤 TEAM PAYLOAD:", teamPayload);

        const res = await fetch(
          "https://backend-ly6h.onrender.com/app/v1/Learn/team-making",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(teamPayload),
          },
        );

        const teamRes = await res.json();
        console.log("📥 TEAM RESPONSE:", teamRes);

        if (!res.ok) {
          alert(teamRes?.msg || "Team creation failed");
          return;
        }

        teamId = teamRes?.data?._id;
        console.log("✅ TEAM ID:", teamId);
      }

      /* ================= JOIN CONTEST ================= */
      const joinPayload = {
        contestId: contestData._id,
        token,
        teamId: teamId, // ✅ FIXED
      };

      console.log("📤 JOIN PAYLOAD:", joinPayload);

      const result = await dispatch(participateInContest(joinPayload)).unwrap();

      console.log("📥 JOIN RESPONSE:", result);

      await dispatch(getContest());

      console.log("✅ PARTICIPATION SUCCESS");
    } catch (err) {
      console.log("🔥 ERROR:", err);

      let msg = "Something went wrong";

      if (typeof err === "string") msg = err;
      else if (err?.msg) msg = err.msg;
      else if (err?.message) msg = err.message;

      alert(msg);
    }
  };

  /* ================= SUBMIT PROJECT ================= */
  const handleSubmitProject = async (teamName, githubLink, liveLink) => {
    try {
      const isTeam = participationType === "team";

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
      dispatch(getContest());
    } catch (err) {
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
      hasParticipated={hasParticipated}
    />
  );
};

export default ContestDetailsPage;
