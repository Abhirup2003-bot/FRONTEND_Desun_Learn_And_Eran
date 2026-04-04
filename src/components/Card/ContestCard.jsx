import React from "react";
import { useNavigate } from "react-router-dom";

const ContestCard = ({ contest }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/contest", { state: contest });
  };

  const getDaysLeft = () => {
    if (!contest.deadline) return "No deadline";

    const end = new Date(contest.deadline);
    const now = new Date();
    const diff = end - now;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days <= 0) return "Ended";
    return `${days} Days`;
  };

  return (
    <div className="bg-[#f5f3ff] rounded-2xl p-3 shadow-sm hover:shadow-md transition duration-300">
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={contest.image || "https://via.placeholder.com/300"}
          alt={contest.title}
          className="w-full h-60 object-cover"
        />

        <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
          {contest.type || "Contest"}
        </span>

        {contest.brief && (
          <span className="absolute top-2 right-2 bg-white text-gray-700 text-[10px] px-2 py-1 rounded-full shadow">
            {contest.brief}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-800 mb-1">
        {contest.title}
      </h2>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {contest.description}
      </p>

      {/* Info */}
      <div className="flex justify-between items-center text-xs mb-4">
        <div>
          <p className="text-gray-400">Type</p>
          <p className="font-semibold text-indigo-600">
            {contest.type || "N/A"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400">Ends in</p>
          <p className="font-semibold text-gray-700">{getDaysLeft()}</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleExplore}
        className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
      >
        View Details →
      </button>
    </div>
  );
};

export default ContestCard;
