import React from "react";
import { Calendar, Clock, Users, Trophy } from "lucide-react";

const ContestDetailsPageUi = ({
  data,
  onParticipate,
  onSubmitProject,
  loading,
}) => {
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
    participationType = "Solo",
    isParticipated,
  } = data;

  const hasParticipated = Boolean(isParticipated);
  const isOngoing = (type || "").toLowerCase() === "ongoing";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* IMAGE */}
        {image && (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img
              src={image}
              alt="contest"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
        )}

        {/* TAGS */}
        <div className="flex flex-wrap gap-3">
          {type && (
            <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
              {type}
            </span>
          )}

          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
            <Users size={12} />
            {participationType}
          </span>

          {hasParticipated && (
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
              Joined
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>

        {/* DATES */}
        <div className="flex flex-wrap gap-8 border-b pb-6 text-gray-700">
          {startingDate && (
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-indigo-500" />
              <span className="font-medium">{formatDate(startingDate)}</span>
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2 text-red-500">
              <Clock size={20} />
              <span className="font-medium">{formatDate(deadline)}</span>
            </div>
          )}

          {prizes && (
            <div className="flex items-center gap-2 text-yellow-600">
              <Trophy size={20} />
              <span className="font-bold">${prizes}</span>
            </div>
          )}
        </div>

        {/* DESCRIPTION & BRIEF */}
        {description && <p className="text-gray-600 text-lg">{description}</p>}
        {brief && <p className="text-gray-500">{brief}</p>}

        {/* BUTTONS */}
        <div className="max-w-md space-y-3">
          {hasParticipated && isOngoing && (
            <button
              onClick={onSubmitProject}
              className="w-full px-6 py-3 rounded-2xl font-bold text-white text-lg bg-green-600 hover:bg-green-700 shadow-lg transition"
            >
              🚀 Submit Project
            </button>
          )}

          {!hasParticipated && (
            <button
              onClick={onParticipate}
              disabled={loading}
              className={`w-full px-6 py-3 rounded-2xl font-bold text-white text-lg shadow-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Participate Now"}
            </button>
          )}

          {hasParticipated && !isOngoing && (
            <button
              disabled
              className="w-full px-6 py-3 rounded-2xl font-bold text-white text-lg bg-gray-400 shadow"
            >
              Contest not started yet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestDetailsPageUi;

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
