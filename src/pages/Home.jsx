import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";

// 🔥 Lazy load UI
const HomeUI = lazy(() => import("../ui/HomeUI"));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    contests = [],
    loading,
    error,
  } = useSelector((state) => state.contest);

  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  const handleExplore = () => {
    navigate("/contest", { state: contests });
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
        </div>
      }
    >
      <HomeUI
        contests={contests}
        loading={loading}
        error={error}
        handleExplore={handleExplore}
      />
    </Suspense>
  );
};

export default Home;
