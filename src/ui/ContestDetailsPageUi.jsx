import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

const ContestDetailsPageUi = ({ data, onParticipate }) => {
  const [teamName, setTeamName] = useState("");

  if (!data) return null;

  const {
    title,
    description,
    brief,
    image,
    deadline,
    type,
    startingDate,
    prizes,
    loading,
  } = data;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* IMAGE */}
        {image && (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img
              src={image}
              alt="contest"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* TYPE */}
        {type && (
          <span className="inline-block bg-indigo-500 text-white text-xs px-3 py-1 rounded-full mb-4 uppercase">
            {type}
          </span>
        )}

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-6 text-slate-900">{title}</h1>

        {/* DATES */}
        <div className="flex flex-wrap gap-8 mb-10 border-b pb-6">
          {startingDate && (
            <div className="flex items-center gap-2">
              <Calendar className="text-green-500" size={18} />
              <div>
                <p className="text-xs text-gray-400">Start Date</p>
                <p className="font-semibold">{formatDate(startingDate)}</p>
              </div>
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2">
              <Clock className="text-red-500" size={18} />
              <div>
                <p className="text-xs text-gray-400">Deadline</p>
                <p className="font-semibold">{formatDate(deadline)}</p>
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        )}

        {/* BRIEF */}
        {brief && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3">Brief</h2>
            <p className="text-gray-600">{brief}</p>
          </div>
        )}

        {/* PRIZES */}
        {prizes && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3">Prizes</h2>
            <p className="text-gray-700 font-semibold">{prizes}</p>
          </div>
        )}

        {/* TEAM INPUT */}
        <div className="mt-6 max-w-md">
          <input
            type="text"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* BUTTON */}
          <button
            onClick={() => onParticipate(teamName)}
            disabled={loading}
            className={`w-full px-6 py-3 rounded-xl font-bold text-white transition
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
  `}
          >
            {loading ? "Processing..." : "Participate Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailsPageUi;

/* ================= HELPER ================= */
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}
