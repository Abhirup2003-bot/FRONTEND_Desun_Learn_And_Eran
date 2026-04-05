import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";
import { useParams } from "react-router-dom";
import ContestDetailsPageUi from "../ui/ContestDetailsPageUi";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { contests, loading, error } = useSelector((state) => state.contest);

  useEffect(() => {
    // Assuming getContest takes an ID, if not, adjust your slice accordingly
    dispatch(getContest(id));
  }, [dispatch, id]);

  if (loading)
    return <div className="p-10 text-center">Loading Contest Details...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  // Assuming contests is an array and we want the specific one, or the slice returns a single object
  const contestData = Array.isArray(contests)
    ? contests.find((c) => c.id === id)
    : contests;

  return <ContestDetailsPageUi data={contestData} />;
};

export default ContestDetailsPage;
