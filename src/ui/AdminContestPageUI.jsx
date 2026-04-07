import React from "react";

const AdminContestPageUI = ({
  formData,
  handleChange,
  handleSubmit,
  handleEdit,
  handleDelete,
  resetForm,
  contests,
  loading,
  message,
  error,
  fileRef,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Contest Management
            </h1>
            <p className="text-gray-500 mt-1">
              Create, update, and monitor your platform's challenges.
            </p>
          </div>

          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit">
            {contests.length} Total Contests
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT FORM ================= */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">
                {formData._id ? "🚀 Update Contest" : "✨ New Contest"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* MESSAGE */}
                {message && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* TITLE */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Contest Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="e.g. Summer Coding Sprint"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                    required
                  />
                </div>

                {/* TYPE + PRIZE */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type || "Upcoming"}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Prizes ($)
                    </label>
                    <input
                      type="number"
                      name="prizes"
                      value={formData.prizes || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* ✅ PARTICIPATION TYPE (ADDED, SAME STYLE) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Participation Type
                  </label>
                  <select
                    name="participationType"
                    value={formData.participationType || "solo"}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="solo">Solo</option>
                    <option value="team">Team</option>
                  </select>
                </div>

                {/* BRIEF */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Short Brief
                  </label>
                  <input
                    name="brief"
                    value={formData.brief || ""}
                    onChange={handleChange}
                    placeholder="One sentence catchphrase..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* DATES */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Starts
                    </label>
                    <input
                      type="datetime-local"
                      name="startingDate"
                      value={formData.startingDate || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Ends
                    </label>
                    <input
                      type="datetime-local"
                      name="deadline"
                      value={formData.deadline || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
                      required
                    />
                  </div>
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    ref={fileRef}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />

                  {formData.imagePreview && (
                    <img
                      src={formData.imagePreview}
                      alt="preview"
                      className="mt-3 h-32 w-full object-cover rounded-xl border"
                    />
                  )}
                </div>

                {/* BUTTONS */}
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition disabled:opacity-50"
                  >
                    {loading
                      ? "Processing..."
                      : formData._id
                        ? "Update Contest"
                        : "Create Contest"}
                  </button>

                  {formData._id && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* ================= RIGHT LIST ================= */}
          <div className="lg:col-span-8 space-y-4">
            {loading && !contests.length && (
              <div className="text-center p-20 text-gray-400">
                Loading contests...
              </div>
            )}

            {!loading && contests.length === 0 && (
              <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed text-gray-400">
                No contests found 🚀
              </div>
            )}

            {contests.map((contest) => (
              <div
                key={contest._id}
                className="bg-white p-5 rounded-2xl border hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg hover:text-blue-600">
                    {contest.title}
                  </h3>

                  <p className="text-sm text-gray-500 italic">
                    "{contest.brief}"
                  </p>

                  <div className="flex gap-4 text-xs mt-2 text-gray-400">
                    <span>🏆 ${contest.prizes}</span>
                    <span>
                      📅{" "}
                      {contest.deadline
                        ? new Date(contest.deadline).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span>👥 {contest.participationType}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(contest)}
                    className="px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-lg hover:bg-amber-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContestPageUI;
