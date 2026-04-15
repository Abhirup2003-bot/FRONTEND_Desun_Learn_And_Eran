import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ITEMS_PER_LOAD = 6;

const MyContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);
  const [submittedMap, setSubmittedMap] = useState({});

  const observerRef = useRef();
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

      if (!res.ok) {
        toast.error(data.msg || "Failed to load contests");
        return;
      }

      setContests(data.msg || []);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyContests();
  }, [token]);

  // 🔥 Lazy Load Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/submit-project/${id}`);
  };

  const getStatusBadge = (contest) => {
    if (contest?.isSubmitted) {
      return (
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
          Submitted
        </span>
      );
    }

    return (
      <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden px-6 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-semibold text-gray-900">My Contests</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Track and submit your projects
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="h-12 w-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      ) : contests.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          No contests participated yet
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contests.slice(0, visibleCount).map((contest) => (
              <div
                key={contest._id}
                onClick={() => handleNavigate(contest._id)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={contest.image}
                    alt={contest.title}
                    className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 px-3 py-1 text-xs bg-white/80 rounded-full">
                    {contest.type}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {contest.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {contest.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(contest.deadline).toLocaleDateString()}
                    </span>

                    {/* 🎯 Dynamic Badge */}
                    {getStatusBadge(contest)}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(contest._id);
                    }}
                    className="w-full mt-auto py-2.5 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[0.97] transition"
                  >
                    Submit Project
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 Observer Trigger */}
          <div ref={observerRef} className="h-10"></div>
        </>
      )}
    </div>
  );
};

export default MyContestsPage;
