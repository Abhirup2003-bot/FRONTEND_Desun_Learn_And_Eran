import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContestCard from "../components/Card/ContestCard";
import { Link } from "react-router-dom";
import {
  FaFilter,
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";

function ContestPageUI({
  filter,
  setFilter,
  isSidebarOpen,
  setIsSidebarOpen,
  filteredContests,
  loading,
  error,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const filters = [
    { name: "All", icon: <FaFilter /> },
    { name: "Upcoming", icon: <FaClock /> },
    { name: "Ongoing", icon: <FaPlay /> },
    { name: "Completed", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-hidden">
      {/* 🔥 Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 👀 Peek Wrapper */}
      <div className="relative">
        {/* tiny visible edge */}
        <div className="hidden md:block fixed left-0 top-0 h-full w-2 z-40" />

        {/* 🔥 Sidebar */}
        <motion.div
          onMouseEnter={() => {
            hoverTimeout.current = setTimeout(() => {
              setIsHovered(true);
            }, 120); // ⏱ delay
          }}
          onMouseLeave={() => {
            clearTimeout(hoverTimeout.current);
            setIsHovered(false);
          }}
          animate={{
            width: isHovered ? 220 : 64, // 🧲 expand
            x:
              typeof window !== "undefined" && window.innerWidth < 768
                ? isSidebarOpen
                  ? 0
                  : -220
                : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
          className="fixed md:static z-50 top-0 left-0 h-full
          backdrop-blur-xl bg-white/60 border-r border-white/30
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          flex flex-col p-3"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {isHovered && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                🚀 Contests
              </motion.h2>
            )}

            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2">
            {filters.map((item) => {
              const active = filter === item.name;

              return (
                <motion.button
                  key={item.name}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => {
                    setFilter(item.name);
                    setIsSidebarOpen(false);
                  }}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
                      : "text-gray-700 hover:bg-white/40"
                  }`}
                >
                  {/* 🎯 Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-indigo-500"
                    />
                  )}

                  {/* Icon */}
                  <span className="text-lg">{item.icon}</span>

                  {/* Label */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap hidden md:block"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 🔥 Main Content */}
      <div className="flex-1 w-full p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {filter} Contests
            </h1>
            <p className="text-gray-500 text-sm">
              {filteredContests?.length || 0} contests available
            </p>
          </div>

          {/* Mobile Filter Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FaFilter />
            Filters
          </motion.button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="h-10 w-10 border-b-2 border-indigo-600 rounded-full"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 bg-red-100 p-3 rounded-lg"
          >
            {error}
          </motion.p>
        )}

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredContests?.length > 0
              ? filteredContests.map((contest) => (
                  <motion.div
                    key={contest._id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/contest/${contest._id}`} className="h-full">
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="h-full"
                      >
                        <ContestCard contest={contest} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              : !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center mt-20"
                  >
                    <h2 className="text-xl font-semibold text-gray-600">
                      😕 No contests found
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                      Try switching filters
                    </p>
                  </motion.div>
                )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ContestPageUI;
