import React from "react";
import { Calendar, Clock, Users } from "lucide-react";

const ContestDetailsPageUi = ({
  data,
  onParticipate,
  onSubmitProject,
  loading,
  hasParticipated,
}) => {
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
    participationType = "solo",
  } = data;

  const [showModal, setShowModal] = React.useState(false);
  const [teamName, setTeamName] = React.useState("");
  const [members, setMembers] = React.useState("");

  const isOngoing = (type || "").toLowerCase() === "ongoing";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {image && (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs">
            {type}
          </span>

          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Users size={12} />
            {participationType}
          </span>

          {hasParticipated && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
              Joined
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        <div className="flex gap-8 mb-8 border-b pb-6">
          {startingDate && (
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              {new Date(startingDate).toLocaleDateString()}
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2 text-red-500">
              <Clock size={20} />
              {new Date(deadline).toLocaleDateString()}
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-6">{description}</p>
        <p className="text-gray-600 mb-6">{brief}</p>

        <p className="font-bold text-lg mb-6">${prizes}</p>

        <div className="max-w-md space-y-3">
          {hasParticipated && isOngoing && (
            <button
              onClick={() => {
                const team = prompt("Enter Team Name (if any)");
                const github = prompt("GitHub Link");
                const live = prompt("Live Link");

                onSubmitProject(team || "", github, live);
              }}
              className="w-full px-6 py-3 rounded-xl font-bold text-white text-lg bg-green-600"
            >
              🚀 Submit Project
            </button>
          )}

          {!hasParticipated && (
            <button
              onClick={() => {
                if (participationType?.trim()?.toLowerCase() === "team") {
                  setShowModal(true);
                } else {
                  onParticipate(null);
                }
              }}
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl font-bold text-white text-lg bg-indigo-600"
            >
              {loading ? "Processing..." : "Participate Now"}
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold">Create Team</h2>

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full border p-2 rounded"
            />

            <input
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Emails comma separated"
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  const membersArray = members
                    .split(",")
                    .map((m) => m.trim())
                    .filter(Boolean);

                  await onParticipate({
                    name: teamName,
                    members: membersArray,
                  });

                  setShowModal(false);
                }}
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
              >
                Create & Join
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetailsPageUi;
