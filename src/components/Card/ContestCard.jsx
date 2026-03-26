import React from "react";

const ContestCard = ({ contest }) => {
  return (
    <div className="bg-[#f5f3ff] rounded-2xl p-3 shadow-sm hover:shadow-md transition duration-300">
      {/* Image Section */}
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={contest.image || "https://via.placeholder.com/300"}
          alt="contest"
          className="w-full h-60 object-cover"
        />

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
          {contest.level || "ACTIVE"}
        </span>

        {/* Tag */}
        {contest.tag && (
          <span className="absolute top-2 right-2 bg-white text-gray-700 text-[10px] px-2 py-1 rounded-full shadow">
            {contest.tag}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-800 mb-1">
        {contest.title}
      </h2>

      {/* Hosted By */}
      <p className="text-xs text-gray-400 mb-3">
        Hosted by {contest.host || "Unknown"}
      </p>

      {/* Info Row */}
      <div className="flex justify-between items-center text-xs mb-4">
        <div>
          <p className="text-gray-400">Prize Pool</p>
          <p className="font-semibold text-indigo-600">${contest.prize}</p>
        </div>

        <div className="text-right">
          <p className="text-gray-400">Ends in</p>
          <p className="font-semibold text-gray-700">
            {contest.time || "5 Days"}
          </p>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition flex items-center justify-center gap-2">
        View Details →
      </button>
    </div>
  );
};

export default ContestCard;
