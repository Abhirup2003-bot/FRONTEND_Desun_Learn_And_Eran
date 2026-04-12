import React from "react";

export default function AdminTeamPageUI({
  teams,
  loading,
  error,
  search,
  setSearch,
  editOpen,
  setEditOpen,
  newName,
  setNewName,
  openEdit,
  handleUpdate,
  handleDelete,
}) {
  // 🔍 FILTER TEAMS
  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Team Management</h1>
          <p className="text-gray-500 text-sm">Manage all teams easily</p>
        </div>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="p-4 border-b font-semibold flex justify-between">
          <span>All Teams</span>
          <span className="text-sm text-gray-500">
            Total: {filteredTeams.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Team Name</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-40"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    No teams found
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr
                    key={team._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{team.name}</td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(team)}
                          className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(team._id)}
                          className="px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Edit Team</h2>

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
