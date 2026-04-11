import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth?.token) ||
    useSelector((state) => state.auth?.user?.token);

  const fetchMyContests = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/perticipents-in",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      console.log("📥 MY CONTESTS:", data);

      if (!res.ok) {
        toast.error(data.msg || "Failed to load contests");
        return;
      }

      setContests(data.msg || []);

      if ((data.msg || []).length === 0) {
        toast.info("No contests participated yet");
      } else {
        toast.success("Contests loaded successfully 🚀");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyContests();
    }
  }, [token]);

  const handleNavigate = (id) => {
    navigate(`/submit-project/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Contests</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : contests.length === 0 ? (
        <p className="text-center text-gray-500">
          No contests participated yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <div
              key={contest._id}
              onClick={() => handleNavigate(contest._id)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
            >
              <img
                src={contest.image}
                alt={contest.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{contest.title}</h2>

                <p className="text-gray-600 text-sm">{contest.description}</p>

                <p className="text-sm text-blue-600">{contest.type}</p>

                <p className="text-sm">
                  Deadline: {new Date(contest.deadline).toLocaleDateString()}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 prevent card click double trigger
                    handleNavigate(contest._id);
                  }}
                  className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Submit Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContestsPage;
