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
    return contests.find((c) => String(c._id || c.id) === String(id));
  }, [contests, id]);

  /* ================= PARTICIPATE ================= */
  const handleParticipate = (teamName) => {
    if (!teamName || !teamName.trim()) {
      alert("Please enter a valid team name");
      return;
    }

    if (!token) {
      alert("Please login first");
      return;
    }

    dispatch(
      participateInContest({
        contestId: contestData._id,
        teamName: teamName.trim(),
        token, // ✅ PASS TOKEN
      }),
    );
  };

  /* ================= MESSAGE / ERROR ================= */
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

  /* ================= UI STATES ================= */

  // Initial loading
  if (loading && contests.length === 0) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading Contest Details...
      </div>
    );
  }

  // Contest not found after load
  if (!loading && !contestData) {
    return (
      <div className="p-10 text-center text-gray-500 font-semibold">
        Contest not found.
      </div>
    );
  }

  return (
    <ContestDetailsPageUi
      data={contestData}
      onParticipate={handleParticipate}
      loading={loading} // 🔥 pass loading for button disable
    />
  );
};

export default ContestDetailsPage;
