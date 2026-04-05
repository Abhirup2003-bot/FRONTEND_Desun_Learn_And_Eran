// import { useState } from "react";

// // ─── Dummy Data ───────────────────────────────────────────────────────────────
// const CONTESTS = [
//   {
//     id: 1,
//     title: "Quantum Security Protocol Challenge",
//     description:
//       "Develop a lightweight cryptographic module for IoT devices using non-linear algorithms.",
//     category: "Dev",
//     tags: ["Dev", "High Stakes"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]", "bg-[rgba(154,43,162,0.9)]"],
//     prize: "$4,500",
//     timeLeft: "2d 14h",
//     joined: 128,
//     buttonStyle: "gradient",
//     image:
//       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Kinetic UI Identity Evolution",
//     description:
//       "Reimagine the visual language for the next generation of competitive educational platforms.",
//     category: "Design",
//     tags: ["Design"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]"],
//     prize: "$2,200",
//     timeLeft: "5d 08h",
//     joined: 45,
//     buttonStyle: "light",
//     image:
//       "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Rust Performance Optimization",
//     description:
//       "Optimize the core engine of our real-time leaderboard system for sub-millisecond latency.",
//     category: "Dev",
//     tags: ["Dev"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]"],
//     prize: "$3,800",
//     timeLeft: "12h 45m",
//     joined: 312,
//     buttonStyle: "gradient",
//     image:
//       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Growth Hack: EdTech 2024",
//     description:
//       "Design a viral acquisition campaign for our new competitive learning modules targeting Gen-Z developers.",
//     category: "Marketing",
//     tags: ["Marketing"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]"],
//     prize: "$1,500",
//     timeLeft: "1d 02h",
//     joined: 89,
//     buttonStyle: "light",
//     image:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "AI Prompt Engineering Showdown",
//     description:
//       "Craft the most effective prompts to solve complex real-world tasks using large language models.",
//     category: "Dev",
//     tags: ["Dev", "High Stakes"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]", "bg-[rgba(154,43,162,0.9)]"],
//     prize: "$6,000",
//     timeLeft: "3d 22h",
//     joined: 204,
//     buttonStyle: "gradient",
//     image:
//       "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
//   },
//   {
//     id: 6,
//     title: "Brand Identity Redesign Sprint",
//     description:
//       "Refresh a SaaS startup's visual identity with a bold new logo, color palette, and type system.",
//     category: "Design",
//     tags: ["Design"],
//     tagColors: ["bg-[rgba(67,105,0,0.9)]"],
//     prize: "$2,800",
//     timeLeft: "7d 00h",
//     joined: 61,
//     buttonStyle: "light",
//     image:
//       "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
//   },
// ];

// const CATEGORIES = ["Design", "Development", "Marketing"];
// const STATUSES = ["Ongoing", "Upcoming", "Completed"];

// // ─── Sidebar Component ────────────────────────────────────────────────────────
// function Sidebar({ filters, onFilterChange }) {
//   const { categories, status, prizeMax } = filters;

//   const toggleCategory = (cat) => {
//     const next = categories.includes(cat)
//       ? categories.filter((c) => c !== cat)
//       : [...categories, cat];
//     onFilterChange({ ...filters, categories: next });
//   };

//   return (
//     <aside className="w-64 shrink-0 flex flex-col gap-8">
//       {/* Category */}
//       <div className="flex flex-col gap-4">
//         <p className="text-[#191d12] text-xs font-bold tracking-[0.7px] uppercase">
//           Category
//         </p>
//         <div className="flex flex-col gap-2">
//           {CATEGORIES.map((cat) => {
//             const checked = categories.includes(cat);
//             return (
//               <label
//                 key={cat}
//                 className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#f1f6e3] transition-colors"
//               >
//                 <span
//                   onClick={() => toggleCategory(cat)}
//                   className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-all cursor-pointer ${
//                     checked
//                       ? "bg-[#436900] border-transparent"
//                       : "bg-white border-[#c2cab0]"
//                   }`}
//                 >
//                   {checked && (
//                     <svg
//                       viewBox="0 0 12 10"
//                       className="w-3 h-3 fill-none stroke-white stroke-2"
//                     >
//                       <polyline points="1,5 4.5,8.5 11,1" />
//                     </svg>
//                   )}
//                 </span>
//                 <span
//                   className={`text-[#424936] text-base ${
//                     checked ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   {cat}
//                 </span>
//               </label>
//             );
//           })}
//         </div>
//       </div>

//       {/* Status */}
//       <div className="flex flex-col gap-4">
//         <p className="text-[#191d12] text-xs font-bold tracking-[0.7px] uppercase">
//           Status
//         </p>
//         <div className="flex flex-col gap-2">
//           {STATUSES.map((s) => {
//             const active = status === s;
//             return (
//               <button
//                 key={s}
//                 onClick={() => onFilterChange({ ...filters, status: s })}
//                 className={`text-left px-3 py-2 rounded-lg text-base transition-all ${
//                   active
//                     ? "text-white font-medium"
//                     : "bg-[#f1f6e3] text-[#424936] font-normal hover:bg-[#e4edcb]"
//                 }`}
//                 style={
//                   active
//                     ? {
//                         background:
//                           "linear-gradient(111deg, #436900 0%, #82c600 100%)",
//                       }
//                     : {}
//                 }
//               >
//                 {s}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Prize Pool */}
//       <div className="flex flex-col gap-4">
//         <p className="text-[#191d12] text-xs font-bold tracking-[0.7px] uppercase">
//           Prize Pool
//         </p>
//         <div className="flex flex-col gap-2">
//           <input
//             type="range"
//             min={0}
//             max={10000}
//             step={500}
//             value={prizeMax}
//             onChange={(e) =>
//               onFilterChange({ ...filters, prizeMax: Number(e.target.value) })
//             }
//             className="w-full accent-[#436900] h-2 rounded-full"
//           />
//           <div className="flex justify-between text-xs font-medium text-[#424936]">
//             <span>$0</span>
//             <span>
//               {prizeMax >= 10000 ? "$10k+" : `$${prizeMax.toLocaleString()}`}
//             </span>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // ─── Contest Card Component ───────────────────────────────────────────────────
// function ContestCard({ contest }) {
//   return (
//     <div className="bg-white rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
//       {/* Image */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={contest.image}
//           alt={contest.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-4 left-4 flex gap-2">
//           {contest.tags.map((tag, i) => (
//             <span
//               key={tag}
//               className={`${contest.tagColors[i]} backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.6px] uppercase px-3 py-1 rounded-full`}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-6 flex flex-col flex-1">
//         <h3 className="text-[#191d12] text-xl font-extrabold leading-7 mb-2">
//           {contest.title}
//         </h3>
//         <p className="text-[#424936] text-sm leading-5 mb-6 flex-1">
//           {contest.description}
//         </p>

//         {/* Stats */}
//         <div className="grid grid-cols-3 border-t border-[rgba(194,202,176,0.3)] pt-5 mb-6 gap-4">
//           <div>
//             <p className="text-[#424936] text-[11px] font-semibold tracking-wide uppercase mb-1">
//               Prize
//             </p>
//             <p className="text-[#436900] text-lg font-semibold">
//               {contest.prize}
//             </p>
//           </div>
//           <div>
//             <p className="text-[#424936] text-[11px] font-semibold tracking-wide uppercase mb-1">
//               Time Left
//             </p>
//             <p className="text-[#191d12] text-lg font-semibold">
//               {contest.timeLeft}
//             </p>
//           </div>
//           <div>
//             <p className="text-[#424936] text-[11px] font-semibold tracking-wide uppercase mb-1">
//               Joined
//             </p>
//             <p className="text-[#191d12] text-lg font-semibold">
//               {contest.joined}
//             </p>
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           className={`w-full py-3 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 ${
//             contest.buttonStyle === "gradient"
//               ? "text-white"
//               : "text-[#4d6e1d] bg-[#c8f08f]"
//           }`}
//           style={
//             contest.buttonStyle === "gradient"
//               ? {
//                   background:
//                     "linear-gradient(135deg, #436900 0%, #82c600 100%)",
//                 }
//               : {}
//           }
//         >
//           View Details
//           <svg viewBox="0 0 8 8" className="w-2.5 h-2.5 fill-current">
//             <path
//               d="M0 4h6M4 1l3 3-3 3"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               fill="none"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Contest Grid Component ───────────────────────────────────────────────────
// function ContestGrid({ contests }) {
//   const [viewMode, setViewMode] = useState("grid");
//   const [visibleCount, setVisibleCount] = useState(4);

//   const visible = contests.slice(0, visibleCount);

//   return (
//     <div className="flex-1 flex flex-col gap-8 min-w-0">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-baseline gap-2">
//           <span className="text-[#191d12] text-3xl font-extrabold">
//             {contests.length}
//           </span>
//           <span className="text-[#424936] text-base font-medium">
//             Active Challenges
//           </span>
//         </div>
//         <div className="flex items-center gap-1 bg-[#f1f6e3] p-1 rounded-lg">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded ${
//               viewMode === "grid" ? "bg-white shadow-sm" : ""
//             } transition-all`}
//             title="Grid view"
//           >
//             <svg
//               viewBox="0 0 18 18"
//               className="w-[18px] h-[18px] fill-[#424936]"
//             >
//               <rect x="1" y="1" width="7" height="7" rx="1" />
//               <rect x="10" y="1" width="7" height="7" rx="1" />
//               <rect x="1" y="10" width="7" height="7" rx="1" />
//               <rect x="10" y="10" width="7" height="7" rx="1" />
//             </svg>
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded ${
//               viewMode === "list" ? "bg-white shadow-sm" : ""
//             } transition-all`}
//             title="List view"
//           >
//             <svg viewBox="0 0 20 16" className="w-5 h-4 fill-[#424936]">
//               <rect x="0" y="0" width="20" height="3" rx="1.5" />
//               <rect x="0" y="6.5" width="20" height="3" rx="1.5" />
//               <rect x="0" y="13" width="20" height="3" rx="1.5" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Cards */}
//       <div
//         className={
//           viewMode === "grid" ? "grid grid-cols-2 gap-8" : "flex flex-col gap-6"
//         }
//       >
//         {visible.map((contest) =>
//           viewMode === "grid" ? (
//             <ContestCard key={contest.id} contest={contest} />
//           ) : (
//             // List view — horizontal card
//             <div
//               key={contest.id}
//               className="bg-white rounded-xl overflow-hidden flex shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="relative w-48 shrink-0 overflow-hidden">
//                 <img
//                   src={contest.image}
//                   alt={contest.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
//                   {contest.tags.map((tag, i) => (
//                     <span
//                       key={tag}
//                       className={`${contest.tagColors[i]} text-white text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full`}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="p-5 flex flex-col flex-1">
//                 <h3 className="text-[#191d12] text-lg font-extrabold mb-1">
//                   {contest.title}
//                 </h3>
//                 <p className="text-[#424936] text-sm leading-5 mb-4 flex-1">
//                   {contest.description}
//                 </p>
//                 <div className="flex items-center gap-6">
//                   <div>
//                     <p className="text-[10px] font-semibold uppercase text-[#424936] tracking-wide mb-0.5">
//                       Prize
//                     </p>
//                     <p className="text-[#436900] font-semibold">
//                       {contest.prize}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-semibold uppercase text-[#424936] tracking-wide mb-0.5">
//                       Time Left
//                     </p>
//                     <p className="text-[#191d12] font-semibold">
//                       {contest.timeLeft}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-semibold uppercase text-[#424936] tracking-wide mb-0.5">
//                       Joined
//                     </p>
//                     <p className="text-[#191d12] font-semibold">
//                       {contest.joined}
//                     </p>
//                   </div>
//                   <button
//                     className="ml-auto px-5 py-2 rounded-lg text-sm font-semibold text-white"
//                     style={{
//                       background:
//                         "linear-gradient(135deg, #436900 0%, #82c600 100%)",
//                     }}
//                   >
//                     View Details →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ),
//         )}
//       </div>

//       {/* Load More */}
//       {visibleCount < contests.length && (
//         <div className="flex justify-center pt-8">
//           <button
//             onClick={() => setVisibleCount((n) => n + 4)}
//             className="border border-[rgba(194,202,176,0.5)] text-[#424936] font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#f1f6e3] transition-colors flex items-center gap-2"
//           >
//             Load More Challenges
//             <svg viewBox="0 0 8 6" className="w-2 h-1.5 fill-[#424936]">
//               <path d="M0 0l4 6 4-6z" />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Contest Page ────────────────────────────────────────────────────────
// export default function ContestPage() {
//   const [filters, setFilters] = useState({
//     categories: ["Development"],
//     status: "Ongoing",
//     prizeMax: 10000,
//   });

//   const filtered = CONTESTS.filter((c) => {
//     const categoryMatch =
//       filters.categories.length === 0 ||
//       filters.categories.some((f) =>
//         c.category.toLowerCase().includes(f.toLowerCase().replace("ment", "")),
//       );
//     const prizeNum = parseInt(c.prize.replace(/[^0-9]/g, ""));
//     const prizeMatch = prizeNum <= filters.prizeMax;
//     return categoryMatch && prizeMatch;
//   });

//   return (
//     <div className="min-h-screen bg-[#f4f7ec] font-sans">
//       {/* Hero Header */}
//       <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-0">
//         <div className="max-w-xl mb-6">
//           <h1 className="text-[#191d12] text-6xl font-extrabold tracking-[-1.5px] leading-[1] mb-4">
//             Push Your <span className="text-[#436900]">Limits.</span>
//           </h1>
//           <p className="text-[#424936] text-lg leading-relaxed">
//             Join the arena where global talent converges. Solve high-velocity
//             challenges, earn prestigious badges, and unlock the next tier of
//             your career.
//           </p>
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="max-w-[1200px] mx-auto px-6 py-10">
//         <div className="flex gap-12 items-start">
//           <Sidebar filters={filters} onFilterChange={setFilters} />
//           <ContestGrid contests={filtered} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContest } from "../features/contestSlice/contestSlice";
import ContestCard from "../components/Card/ContestCard";
import {
  FaFilter,
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";

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

  const filters = [
    { name: "All", icon: <FaFilter /> },
    { name: "Upcoming", icon: <FaClock /> },
    { name: "Ongoing", icon: <FaPlay /> },
    { name: "Completed", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* 🔹 Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 backdrop-blur-lg bg-white/80 border-r border-gray-200 p-6 shadow-xl transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-700">🚀 Contests</h2>

          {/* Close btn (mobile) */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {filters.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setFilter(item.name);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === item.name
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-105"
                  : "hover:bg-indigo-100 text-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Main Content */}
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
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>
        )}

        {/* Contest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredContests?.length > 0
            ? filteredContests.map((contest) => (
                <div
                  key={contest._id}
                  className="transform hover:-translate-y-2 transition duration-300"
                >
                  <ContestCard contest={contest} />
                </div>
              ))
            : !loading && (
                <div className="col-span-full text-center mt-20">
                  <h2 className="text-xl font-semibold text-gray-600">
                    😕 No contests found
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Try switching filters
                  </p>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default ContestPage;
