import React from "react";
import { Calendar, Clock, Users } from "lucide-react";

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

  /* ================= SAFE CONDITIONS ================= */

  // ✅ FIX: ensure boolean (avoid undefined/null)
  const hasParticipated = Boolean(isParticipated);
  console.log("Contest Data:", data);

  // ✅ FIX: safe lowercase
  const isOngoing = (type || "").toLowerCase() === "ongoing";

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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

        {/* TAGS */}
        <div className="flex gap-3 mb-4">
          {type && (
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
              {type}
            </span>
          )}

          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Users size={12} />
            {participationType}
          </span>

          {/* ✅ Joined badge */}
          {hasParticipated && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
              Joined
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* DATES */}
        <div className="flex gap-8 mb-8 border-b pb-6">
          {startingDate && (
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              {formatDate(startingDate)}
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2 text-red-500">
              <Clock size={20} />
              {formatDate(deadline)}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {description && <p className="mb-6 text-gray-600">{description}</p>}

        {/* BRIEF */}
        {brief && <p className="mb-6 text-gray-600">{brief}</p>}

        {/* PRIZE */}
        {prizes && <p className="font-bold text-lg mb-6">${prizes}</p>}

        {/* ================= BUTTONS ================= */}

        <div className="max-w-md space-y-3">
          {/* ✅ CASE 1: USER JOINED + ONGOING */}
          {hasParticipated && isOngoing && (
            <button
              onClick={onSubmitProject}
              className="w-full px-6 py-3 rounded-xl font-bold text-white text-lg bg-green-600 hover:bg-green-700"
            >
              🚀 Submit Project
            </button>
          )}

          {/* ✅ CASE 2: USER NOT JOINED */}
          {!hasParticipated && (
            <button
              onClick={onParticipate}
              disabled={loading}
              className={`w-full px-6 py-3 rounded-xl font-bold text-white text-lg ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Participate Now"}
            </button>
          )}

          {/* ✅ CASE 3: JOINED BUT NOT STARTED */}
          {hasParticipated && !isOngoing && (
            <button
              disabled
              className="w-full px-6 py-3 rounded-xl font-bold text-white text-lg bg-gray-400"
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
  return new Date(date).toLocaleDateString();
}
