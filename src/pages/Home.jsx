import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, ContestCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";
import { ArrowRight } from "lucide-react";

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

  const SectionHeader = ({ title, subtitle, colorClass }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-slate-500 font-medium">{subtitle}</p>
      </div>
      <button
        onClick={handleExplore}
        className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 border ${colorClass}`}
      >
        View All
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <main className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Ongoing Contests Section */}
          <section className="mb-24">
            <SectionHeader
              title="Ongoing Contests"
              subtitle="Live challenges active right now"
              colorClass="bg-slate-900 text-white border-slate-900 hover:bg-slate-800 shadow-sm"
            />

            {loading && (
              <div className="animate-pulse flex space-x-4">Loading...</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {contests
                .filter((c) => c.type === "Ongoing")
                .slice(0, 3)
                .map((contest) => (
                  <div
                    key={contest._id}
                    className="group relative border border-slate-100 rounded-[32px] transition-all duration-300 hover:border-indigo-400/50"
                  >
                    <ContestCard contest={contest} />
                  </div>
                ))}
            </div>
          </section>

          {/* Upcoming Contests Section */}
          <section>
            <SectionHeader
              title="Upcoming Challenges"
              subtitle="Mark your calendar for these events"
              colorClass="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {contests
                .filter((c) => c.type === "Upcoming")
                .slice(0, 3)
                .map((contest) => (
                  <div
                    key={contest._id}
                    className="group relative border border-slate-100 rounded-[32px] transition-all duration-300 hover:border-slate-400"
                  >
                    <ContestCard contest={contest} />
                  </div>
                ))}
            </div>
          </section>

          {!loading && contests.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-slate-400 font-medium">
                No contests available at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
