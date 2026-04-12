import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminSubmissionPage() {
  const { contestId } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);

        // Ensure this URL matches your working Postman environment (Local vs Render)
        const res = await fetch(
          `https://backend-ly6h.onrender.com/app/v1/Admin/get-all-projects/${contestId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        console.log("🔥 API RAW RESPONSE:", data);

        // Your Postman response shows the array is inside the "mag" key
        const formatted = data?.mag || [];

        setSubmissions(formatted);
      } catch (error) {
        console.error("❌ Error fetching submissions:", error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    if (contestId) fetchSubmissions();
  }, [contestId, token]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Contest Submissions
        </h1>
        <p className="text-sm text-gray-500 font-mono">ID: {contestId}</p>
      </header>

      {loading ? (
        <div className="flex justify-center p-10">
          <p className="text-blue-600 animate-pulse font-medium">
            Loading submissions...
          </p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white border rounded-lg p-10 text-center shadow-sm">
          <p className="text-gray-500 italic">
            No submissions found for this contest.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submissions.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Team Name
                </span>
                <h2 className="font-bold text-xl text-indigo-700">
                  {item.teamName?.name || "Unnamed Team"}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {item.githubLink && (
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black transition-colors"
                  >
                    View GitHub
                  </a>
                )}

                {item.liveLink && (
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
