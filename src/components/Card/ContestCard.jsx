import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react"; // Optional: assumes lucide-react icons
import defaultImage from "../../assets/mern-stack-developer.png";

const ContestCard = ({ contest }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/contest", { state: contest });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group relative bg-white border border-slate-100 rounded-[24px] p-2 pb-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
      {/* --- Image Section --- */}
      <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
        <img
          src={contest.image || defaultImage}
          alt={contest.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Type Badge - Glassmorphism style */}
        <div className="absolute top-3 left-3 backdrop-blur-md bg-white/70 border border-white/20 px-3 py-1 rounded-full shadow-sm">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            {contest.type || "Contest"}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="px-3 pt-4">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {contest.title}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-1 italic">
            {contest.brief || "Ready to showcase your skills?"}
          </p>
        </div>

        {/* --- Date "Bento" Grid --- */}
        <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3 mb-5 border border-slate-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Starts
            </span>
            <span className="text-[13px] font-bold text-slate-700">
              {formatDate(contest.startDate)}
            </span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200" /> {/* Divider */}
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Deadline
            </span>
            <span className="text-[13px] font-bold text-rose-500">
              {formatDate(contest.deadline)}
            </span>
          </div>
        </div>

        {/* --- Modern Action Button --- */}
        <button
          onClick={handleExplore}
          className="group/btn relative w-full overflow-hidden bg-slate-900 text-white py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
