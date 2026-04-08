import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const TeamContestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth?.token) ||
    useSelector((state) => state.auth?.user?.token);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAndParticipate = async () => {
    if (!teamName.trim()) {
      alert("Team name required");
      return;
    }

    const membersArray = members
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m);

    if (!membersArray.length) {
      alert("Add valid emails");
      return;
    }

    console.log("📤 SENDING:", {
      name: teamName,
      members: membersArray,
    });

    try {
      setLoading(true);

      /* ===== CREATE TEAM ===== */
      const teamRes = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/team-making",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: teamName,
            members: membersArray, // ✅ string array
          }),
        },
      );

      const teamData = await teamRes.json();

      console.log("📥 TEAM RESPONSE:", teamData);

      if (!teamRes.ok) {
        alert(teamData.msg);
        return;
      }

      const teamId = teamData.data._id;

      /* ===== PARTICIPATE ===== */
      const partRes = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Learn/perticipate-as-team/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ teamId }),
        },
      );

      const partData = await partRes.json();

      console.log("📥 PARTICIPATE RESPONSE:", partData);

      if (!partRes.ok) {
        alert(partData.msg);
        return;
      }

      alert("✅ Successfully Participated!");
      navigate(`/contest/${id}`);
    } catch (err) {
      console.error("❌ ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Team</h1>

      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Emails (comma separated)"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleCreateAndParticipate}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Create Team & Participate"}
      </button>
    </div>
  );
};

export default TeamContestPage;
