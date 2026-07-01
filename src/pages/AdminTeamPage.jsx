// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import AdminTeamPageUI from "../ui/AdminTeamPageUI";
// import { useSelector } from "react-redux";

// export default function AdminTeamPage() {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");

//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [newName, setNewName] = useState("");

//   const BASE_URL = "https://backend-ly6h.onrender.com/app/v1/Admin";
//   const { token } = useSelector((state) => state.auth);

//   // =========================
//   // FETCH TEAMS
//   // =========================
//   const fetchTeams = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`${BASE_URL}/get-all-teams`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.message || "Failed to fetch teams");

//       const teamsData = Array.isArray(data?.data) ? data.data : [];
//       setTeams(teamsData);
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   // =========================
//   // OPEN EDIT
//   // =========================
//   const openEdit = (team) => {
//     setSelectedTeam(team);
//     setNewName(team.name);
//     setEditOpen(true);
//   };

//   // =========================
//   // UPDATE TEAM
//   // =========================
//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/update-teams/${selectedTeam._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name: newName }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.message || "Update failed");

//       toast.success("Team updated successfully");

//       setEditOpen(false);
//       setSelectedTeam(null);
//       setNewName("");

//       fetchTeams();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   // =========================
//   // DELETE TEAM
//   // =========================
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`${BASE_URL}/delete-teams/${id}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.message || "Delete failed");

//       toast.success("Team deleted");

//       fetchTeams();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <AdminTeamPageUI
//       teams={teams}
//       loading={loading}
//       error={error}
//       search={search}
//       setSearch={setSearch}
//       editOpen={editOpen}
//       setEditOpen={setEditOpen}
//       newName={newName}
//       setNewName={setNewName}
//       openEdit={openEdit}
//       handleUpdate={handleUpdate}
//       handleDelete={handleDelete}
//     />
//   );
// }

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminTeamPageUI from "../ui/AdminTeamPageUI";
import { useSelector } from "react-redux";

export default function AdminTeamPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newName, setNewName] = useState("");

  // ✅ DELETE MODAL STATE (NEW)
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const BASE_URL = "https://backend-ly6h.onrender.com/app/v1/Admin";
  const { token } = useSelector((state) => state.auth);

  // =========================
  // FETCH TEAMS
  // =========================
  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/get-all-teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch teams");

      setTeams(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // =========================
  // EDIT
  // =========================
  const openEdit = (team) => {
    setSelectedTeam(team);
    setNewName(team.name);
    setEditOpen(true);
  };

  // =========================
  // UPDATE TEAM
  // =========================
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/update-teams/${selectedTeam._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Update failed");

      toast.success("Team updated successfully");

      setEditOpen(false);
      setSelectedTeam(null);
      setNewName("");

      fetchTeams();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // =========================
  // DELETE FLOW (MODAL)
  // =========================
  const askDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/delete-teams/${deleteId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Delete failed");

      toast.success("Team deleted");

      setDeleteOpen(false);
      setDeleteId(null);

      fetchTeams();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <AdminTeamPageUI
        teams={teams}
        loading={loading}
        error={error}
        search={search}
        setSearch={setSearch}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        newName={newName}
        setNewName={setNewName}
        openEdit={openEdit}
        handleUpdate={handleUpdate}
        handleDelete={askDelete} // ✅ UPDATED
      />

      {/* ================= DELETE MODAL ================= */}
      {deleteOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Delete Team</h2>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to delete this team? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
