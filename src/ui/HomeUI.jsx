import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Lazy components
const HeroSection = lazy(() => import("../components/HeroSection/HeroSection"));
const ContestCard = lazy(() => import("../components/Card/ContestCard"));

function HomeUI({ contests, loading, error, handleExplore }) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const SectionHeader = ({ title, subtitle, colorClass }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4 px-2 md:px-4"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          {title}
        </h2>
        <p className="text-slate-500 text-sm md:text-base">{subtitle}</p>
      </div>

      <button
        onClick={handleExplore}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold backdrop-blur-md focus:outline-none ${colorClass}`}
      >
        View All
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HERO */}
      <Suspense fallback={<div className="h-[300px]" />}>
        <HeroSection />
      </Suspense>

      {/* MAIN */}
      <main className="w-full px-4 md:px-10 lg:px-16 xl:px-24 py-20">
        {/* Ongoing */}
        <section className="mb-28">
          {loading && (
            <div className="animate-pulse text-slate-400">
              Loading contests...
            </div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-stretch"
          >
            {contests
              .filter((c) => c.type === "Ongoing")
              .slice(0, 4)
              .map((contest) => (
                <motion.div
                  key={contest._id}
                  variants={card}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-[28px] bg-white/50 backdrop-blur-xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* hover glow only (no border) */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-100/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  <div className="relative h-full flex flex-col">
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                      <ContestCard contest={contest} />
                    </Suspense>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </section>

        {/* Upcoming */}
        <section>
          <SectionHeader
            title="Upcoming Challenges"
            subtitle="Mark your calendar for these events"
            colorClass="bg-white/60 text-slate-700 hover:bg-white/80"
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-stretch"
          >
            {contests
              .filter((c) => c.type === "Upcoming")
              .slice(0, 4)
              .map((contest) => (
                <motion.div
                  key={contest._id}
                  variants={card}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-[28px] bg-white/50 backdrop-blur-xl transition-all duration-300 h-full flex flex-col"
                >
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-green-100/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  <div className="relative h-full flex flex-col">
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                      <ContestCard contest={contest} />
                    </Suspense>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </section>

        {/* Empty */}
        {!loading && contests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 rounded-3xl bg-white/40 backdrop-blur-xl"
          >
            <p className="text-slate-400 text-lg">
              No contests available at the moment.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default HomeUI;
