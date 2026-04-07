import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContestDetailsPageUi from "../ui/ContestDetailsPageUi";
import { getContest } from "../features/contestSlice/contestSlice";

const ContestDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    contests = [],
    loading,
    error,
  } = useSelector((state) => state.contest);

  // ✅ Fetch contests if not already loaded
  useEffect(() => {
    if (!contests.length) {
      dispatch(getContest());
    }
  }, [dispatch, contests.length]);

  // ✅ Find contest (supports both _id and id)
  const contestData = contests.find(
    (c) => String(c._id || c.id) === String(id),
  );

  // ✅ Loading
  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading Contest Details...
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }

  // ✅ Not Found
  if (!contestData) {
    return (
      <div className="p-10 text-center text-gray-500 font-semibold">
        Contest not found.
      </div>
    );
  }

  // ✅ Success
  return <ContestDetailsPageUi data={contestData} />;
};

export default ContestDetailsPage;
