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
    <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4 px-2 md:px-4">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium">
          {subtitle}
        </p>
      </div>

      <button
        onClick={handleExplore}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 border backdrop-blur-md ${colorClass}`}
      >
        View All
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HERO */}
      <HeroSection />

      {/* FULL WIDTH MAIN */}
      <main className="w-full px-4 md:px-10 lg:px-16 xl:px-24 py-20">
        {/* Ongoing Contests */}
        <section className="mb-28">
          {loading && (
            <div className="animate-pulse text-slate-400">
              Loading contests...
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {contests
              .filter((c) => c.type === "Ongoing")
              .slice(0, 3)
              .map((contest) => (
                <div
                  key={contest._id}
                  className="group relative rounded-[28px] border border-slate-200/60 bg-white/70 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300"
                >
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-100/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                  <div className="relative">
                    <ContestCard contest={contest} />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <SectionHeader
            title="Upcoming Challenges"
            subtitle="Mark your calendar for these events"
            colorClass="bg-white/80 text-slate-700 border-slate-200 hover:bg-white shadow-md"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {contests
              .filter((c) => c.type === "Upcoming")
              .slice(0, 4)
              .map((contest) => (
                <div
                  key={contest._id}
                  className="group relative rounded-[28px] border border-slate-200/60 bg-white/70 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-400"
                >
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-green-100/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                  <div className="relative">
                    <ContestCard contest={contest} />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Empty State */}
        {!loading && contests.length === 0 && (
          <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl bg-white/60 backdrop-blur">
            <p className="text-slate-400 font-medium text-lg">
              No contests available at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
