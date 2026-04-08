import React from "react";
import { Calendar, Clock, Users } from "lucide-react";

const ContestDetailsPageUi = ({ data, onParticipate, loading }) => {
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
  } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* IMAGE */}
        {image && (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img
              src={image}
              alt="contest"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* TYPE & PARTICIPATION */}
        <div className="flex flex-wrap gap-3 mb-4">
          {type && (
            <span className="inline-block bg-indigo-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
              {type}
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
            <Users size={12} />
            {participationType}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{title}</h1>

        {/* DATES */}
        <div className="flex flex-wrap gap-8 mb-10 border-b border-gray-200 pb-6">
          {startingDate && (
            <div className="flex items-center gap-2">
              <Calendar className="text-indigo-500" size={20} />
              <div>
                <p className="text-xs text-gray-400">Start Date</p>
                <p className="font-semibold text-gray-700">
                  {formatDate(startingDate)}
                </p>
              </div>
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2">
              <Clock className="text-red-500" size={20} />
              <div>
                <p className="text-xs text-gray-400">Deadline</p>
                <p className="font-semibold text-red-500">
                  {formatDate(deadline)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}

        {/* BRIEF */}
        {brief && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3 text-gray-900">Brief</h2>
            <p className="text-gray-600 leading-relaxed">{brief}</p>
          </div>
        )}

        {/* PRIZES */}
        {prizes && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3 text-gray-900">Prizes</h2>
            <p className="text-gray-700 font-semibold text-lg">${prizes}</p>
          </div>
        )}

        {/* PARTICIPATE BUTTON */}
        <div className="mt-6 max-w-md">
          <button
            onClick={onParticipate}
            disabled={loading}
            className={`w-full px-6 py-3 rounded-xl font-bold text-white text-lg transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"}
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

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
