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
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Contest Management
            </h1>
            <p className="text-gray-500 mt-1">
              Create, update, and monitor your platform's challenges.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {contests.length} Total Contests
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                {formData._id ? "🚀 Update Contest" : "✨ New Contest"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {message && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm animate-pulse">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Contest Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Summer Coding Sprint"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Prizes ($)
                    </label>
                    <input
                      type="number"
                      name="prizes"
                      value={formData.prizes}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Short Brief
                  </label>
                  <input
                    name="brief"
                    placeholder="One sentence catchphrase..."
                    value={formData.brief}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                      Starts
                    </label>
                    <input
                      type="datetime-local"
                      name="startingDate"
                      value={formData.startingDate}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
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
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] disabled:opacity-50"
                    disabled={loading}
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
                      className="w-full py-3 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: LIST SECTION */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {loading && !contests.length && (
                <div className="flex justify-center p-20 text-gray-400">
                  Loading contests...
                </div>
              )}

              {!loading && contests.length === 0 && (
                <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200 text-gray-400 font-medium">
                  No contests found. Start by creating one!
                </div>
              )}

              {contests.map((contest) => (
                <div
                  key={contest._id}
                  className="group bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {contest.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          contest.type === "Ongoing"
                            ? "bg-green-100 text-green-700"
                            : contest.type === "Upcoming"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {contest.type}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-1 mb-2 italic">
                      "{contest.brief}"
                    </p>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-600">
                          🏆 Prize:
                        </span>{" "}
                        ${contest.prizes}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-600">
                          📅 Ends:
                        </span>{" "}
                        {new Date(contest.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleEdit(contest)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors"
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
    </div>
  );
};

export default AdminContestPageUI;
