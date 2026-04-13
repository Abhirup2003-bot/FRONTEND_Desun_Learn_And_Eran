import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Winners() {
  const { token } = useSelector((state) => state.auth);

  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getTeamName = (team) => {
    if (!team) return "Solo Participant";
    if (typeof team === "object") return team?.name || "Unnamed Team";
    return team;
  };

  const fetchWinners = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/winners",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setWinners(data.winners || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  const groupedByContest = winners.reduce((acc, winner) => {
    const contestId = winner?.contest?._id;

    if (!acc[contestId]) {
      acc[contestId] = {
        contest: winner.contest,
        winners: [],
      };
    }

    acc[contestId].winners.push(winner);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-tight">
        🏆 Winners Showcase
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Loading winners...
        </p>
      ) : Object.keys(groupedByContest).length === 0 ? (
        <p className="text-center text-gray-400">No winners found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(groupedByContest).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedContest(item);
                setShowModal(true);
              }}
              className="group cursor-pointer bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item?.contest?.image}
                  alt="contest"
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item?.contest?.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {item?.contest?.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(item?.contest?.startingDate).toLocaleDateString()}
                  </span>

                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                    {item?.winners?.length} Winners
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && selectedContest && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            {/* TITLE */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              {selectedContest?.contest?.title}
            </h2>

            {/* WINNERS LIST */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {selectedContest?.winners?.map((winner, i) => (
                <div
                  key={winner._id}
                  className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">#{i + 1}</p>

                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Winner
                    </span>
                  </div>

                  <p className="mt-2 text-gray-800 font-medium">
                    {getTeamName(winner.teamName)}
                  </p>

                  {/* MEMBERS */}
                  {typeof winner.teamName === "object" &&
                    winner.teamName?.members && (
                      <div className="text-sm text-gray-500 mt-2">
                        <p className="font-medium">Members:</p>
                        <ul className="list-disc ml-5">
                          {winner.teamName.members.map((m, idx) => (
                            <li key={idx}>
                              {m?.userName || m?.email || "Member"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
