import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ContestDetailsPageUi from "../ui/ContestDetailsPageUi";
import {
  getContest,
  participateInContest,
  clearMessage,
} from "../features/contestSlice/contestSlice";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          alert("This contest requires a team. Redirecting to team creation.");
          return;
        }

        // CREATE TEAM
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

      // PARTICIPATE IN CONTEST
      await dispatch(
        participateInContest({
          contestId: contestData._id,
          token,
          teamId,
        }),
      ).unwrap();
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

  /* ================= UI ================= */
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
      onSubmitProject={() => navigate(`/submit-project/${id}`)}
      loading={loading}
    />
  );
};

export default ContestDetailsPage;
