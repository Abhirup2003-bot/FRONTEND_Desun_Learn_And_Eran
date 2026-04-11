import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubmitProjectPage = () => {
  const { id } = useParams(); // contestId

  const token =
    useSelector((state) => state.auth?.token) ||
    useSelector((state) => state.auth?.user?.token);

  const [teamId, setTeamId] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmitProject = async () => {
    if (!teamId.trim()) {
      toast.error("Team ID is required");
      return;
    }

    if (!liveLink.trim()) {
      toast.error("Live project link is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-team/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            teamName: teamId,
            githubLink: githubLink || "",
            liveLink,
          }),
        },
      );

      const data = await res.json();

      console.log("📥 RESPONSE:", data);

      // 🔥 HANDLE ALREADY SUBMITTED
      if (data?.isSubmitted) {
        setAlreadySubmitted(true);
        setSubmittedData(data.data);

        toast.info("⚠️ Project already submitted");
        return;
      }

      if (!res.ok) {
        toast.error(data.msg || "Submission failed");
        return;
      }

      toast.success("🎉 Project Submitted Successfully!");

      // Save submitted data
      setAlreadySubmitted(true);
      setSubmittedData(data.data);

      // Reset form
      setTeamId("");
      setGithubLink("");
      setLiveLink("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center">Submit Project 🚀</h1>

        {/* 🔥 Already Submitted UI */}
        {alreadySubmitted && submittedData && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded">
            <p className="font-semibold">✅ Already Submitted</p>
            <p className="text-sm mt-1">Live Link: {submittedData.liveLink}</p>
            {submittedData.githubLink && (
              <p className="text-sm">GitHub: {submittedData.githubLink}</p>
            )}
          </div>
        )}

        {/* Team ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Team ID</label>
          <input
            type="text"
            placeholder="Enter your Team ID (ObjectId)"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            disabled={alreadySubmitted}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium mb-1">
            GitHub Link (Optional)
          </label>
          <input
            type="text"
            placeholder="https://github.com/your-project"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            disabled={alreadySubmitted}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200"
          />
        </div>

        {/* Live Link */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Live Project Link *
          </label>
          <input
            type="text"
            placeholder="https://your-live-app.com"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            disabled={alreadySubmitted}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitProject}
          disabled={loading || alreadySubmitted}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {alreadySubmitted
            ? "Already Submitted"
            : loading
              ? "Submitting..."
              : "Submit Project"}
        </button>
      </div>
    </div>
  );
};

export default SubmitProjectPage;
