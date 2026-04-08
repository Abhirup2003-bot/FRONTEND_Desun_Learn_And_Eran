import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SubmitProjectPage = () => {
  const { id } = useParams(); // contestId

  const token =
    useSelector((state) => state.auth?.token) ||
    useSelector((state) => state.auth?.user?.token);

  const [teamId, setTeamId] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitProject = async () => {
    if (!teamId || !liveLink) {
      alert("Team ID and Live link required");
      return;
    }

    try {
      setLoading(true);

      console.log("📤 SENDING:", {
        teamName: teamId,
        githubLink,
        liveLink,
      });

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/submit-project-as-team/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            teamName: teamId, // 🔥 IMPORTANT: send teamId
            githubLink,
            liveLink,
          }),
        },
      );

      const data = await res.json();

      console.log("📥 RESPONSE:", data);

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      alert("✅ Project Submitted Successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Submit Project</h1>

      <input
        type="text"
        placeholder="Team ID"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="GitHub Link (optional)"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Live Project Link"
        value={liveLink}
        onChange={(e) => setLiveLink(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleSubmitProject}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Project"}
      </button>
    </div>
  );
};

export default SubmitProjectPage;
