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

  // ✅ Always read token dynamically from Redux
  const authState = useSelector((state) => state.auth);
  const token = authState?.token;
  const isLoggedIn = authState?.isLoggedIn;

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
  const handleParticipate = async () => {
    if (!isLoggedIn || !token) {
      alert("Please login first");
      return;
    }

    if (!contestData) return;

    // 🔥 Dispatch participation
    dispatch(
      participateInContest({
        contestId: contestData._id,
        token,
      }),
    );
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
