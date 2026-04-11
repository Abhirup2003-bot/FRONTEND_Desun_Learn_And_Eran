import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContestDetailsPageUi from "../ui/ContestDetailsPageUi";
import { toast } from "react-toastify";
import {
  getContest,
  clearMessage,
} from "../features/contestSlice/contestSlice";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  /* ================= AUTH ================= */
  const authState = useSelector((state) => state.auth);
  const token = authState?.token || authState?.user?.token;
  const userId = authState?.user?._id;

  /* ================= CONTEST STATE ================= */
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

  /* ================= TYPE ================= */
  const participationType = useMemo(() => {
    return contestData?.participationType
      ? String(contestData.participationType).trim().toLowerCase()
      : "solo";
  }, [contestData]);

  /* ================= CHECK PARTICIPATION ================= */
  const hasParticipated = useMemo(() => {
    if (!contestData || !userId) return false;

    const teams = contestData?.teams || [];

    return teams.some((t) => {
      return (
        String(t?.createdTeamBy) === String(userId) ||
        (t?.members || []).some((m) => String(m) === String(userId))
      );
    });
  }, [contestData, userId]);

  /* ================= PARTICIPATE ================= */
  const handleParticipate = async (teamData = null) => {
    try {
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const payload =
        participationType === "team"
          ? {
              name: teamData.name,
              members: teamData.members,
            }
          : {
              name: teamData?.name || `solo-${userId}-${Date.now()}`,
              members: [], // ✅ SOLO HAS NO MEMBERS
            };

      console.log("📤 PAYLOAD:", payload);

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/team-making/${contestData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      /* ✅ SAFE PARSE */
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("❌ Not JSON:", text);
        toast.error("Server error");
        return;
      }

      if (!res.ok) {
        toast.error(data.msg || "Failed to participate");
        return;
      }

      console.log("✅ SUCCESS:", data);

      toast.success("Joined successfully 🚀");

      dispatch(getContest());
    } catch (err) {
      console.log("🔥 ERROR:", err);
      toast.error("Something went wrong");
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
        toast.error(data.msg || "Submission failed");
        return;
      }

      toast.success("Project submitted successfully 🚀");
    } catch (err) {
      console.log(err);
      toast.error("Submission failed");
    }
  };

  /* ================= HANDLE REDUX ALERTS ================= */
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [error, dispatch]);

  /* ================= LOADING ================= */
  if (loading && contests.length === 0) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!contestData) {
    return <div className="p-10 text-center">Contest not found</div>;
  }

  /* ================= RENDER ================= */
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
