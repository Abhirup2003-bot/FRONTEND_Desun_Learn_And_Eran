import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, ContestCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    contests = [],
    loading,
    error,
  } = useSelector((state) => state.contest);

  console.log("contest data 👉", contests);
  console.log("loading 👉", loading);
  console.log("error 👉", error);

  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  const handleExplore = () => {
    navigate("/contest", { state: contests });
  };

  return (
    <>
      <HeroSection />

      <div className="p-6">
        <div className="bg-[#f1f6e3] rounded-2xl p-6 md:p-8 text-black shadow-lg ">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Explore Contests 🚀</h1>
                <p className="text-sm opacity-90">
                  Join competitions & win rewards
                </p>
              </div>

              <button
                onClick={handleExplore}
                className="bg-white text-[#82c600] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
              >
                Explore
              </button>
            </div>

            {/* Status */}
            {loading && <p>Loading contests...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && contests.length === 0 && <p>No contests available</p>}

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contests
                .filter((contest) => contest.type === "Ongoing")
                .slice(0, 3)
                .map((contest) => (
                  <div
                    key={contest._id}
                    className="bg-white/10 backdrop-blur-md p-1 rounded-2xl"
                  >
                    <ContestCard contest={contest} />
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contests
                .filter((contest) => contest.type === "Upcoming")
                .slice(0, 3)
                .map((contest) => (
                  <div
                    key={contest._id}
                    className="bg-white/10 backdrop-blur-md p-1 rounded-2xl"
                  >
                    <ContestCard contest={contest} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
