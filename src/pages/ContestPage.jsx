import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";

// 🔥 Lazy load UI
const ContestPageUI = lazy(() => import("../ui/ContestPageUI"));

function ContestPage() {
  const dispatch = useDispatch();
  const { contests, error, loading } = useSelector((state) => state.contest);

  const [filter, setFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  const filteredContests = contests?.filter((contest) => {
    if (filter === "All") return true;
    return contest.type === filter;
  });

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
        </div>
      }
    >
      <ContestPageUI
        filter={filter}
        setFilter={setFilter}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filteredContests={filteredContests}
        loading={loading}
        error={error}
      />
    </Suspense>
  );
}

export default ContestPage;
