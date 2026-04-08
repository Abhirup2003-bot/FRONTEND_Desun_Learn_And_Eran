import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
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

  // Dynamic Styles based on Contest Type
  const isOngoing = contest.type?.toLowerCase() === "ongoing";
  const badgeColors = isOngoing
    ? "bg-emerald-500/10 text-emerald-600 border-emerald-200/50"
    : "bg-amber-500/10 text-amber-600 border-amber-200/50";

  return (
    <div className="group relative bg-white border border-slate-200/60 rounded-[32px] p-3 pb-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* --- Image Section --- */}
      <div className="relative h-48 w-full overflow-hidden rounded-[24px] z-0">
        <img
          src={contest.image || defaultImage}
          alt={contest.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Dynamic Type Badge */}
        <div
          className={`absolute top-4 left-4 backdrop-blur-md border px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 ${badgeColors}`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isOngoing ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {contest.type || "Contest"}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="px-2 pt-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
            {contest.title}
          </h2>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed font-medium">
          {contest.brief ||
            "Push your technical boundaries and showcase your skills to the world."}
        </p>

        {/* Status Pills */}
        <div className="flex gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-lg uppercase tracking-tight">
            <Users className="w-3.5 h-3.5" />
            {contest.participationType || "Solo"}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg uppercase tracking-tight">
            <Zap className="w-3.5 h-3.5" />
            {contest.prize || "Certificate"}
          </div>
        </div>

        {/* --- Date Info --- */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl">
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Starts
              </span>
              <span className="text-sm font-bold text-slate-700">
                {formatDate(contest.startingDate)}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              Deadline
            </span>
            <span className="text-sm font-black text-rose-500">
              {formatDate(contest.deadline)}
            </span>
          </div>
        </div>

        {/* --- Button (STICKS TO BOTTOM) --- */}
        <div className="mt-auto">
          <button
            onClick={handleExplore}
            className="group/btn relative w-full h-12 flex items-center justify-center bg-slate-900 text-white rounded-2xl overflow-hidden transition-all duration-300 hover:bg-indigo-600 active:scale-95 shadow-xl shadow-slate-200"
          >
            <span className="z-10 flex items-center gap-2 font-bold text-sm">
              Join Competition
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
