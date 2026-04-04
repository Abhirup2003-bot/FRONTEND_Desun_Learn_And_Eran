import React, { useState } from "react";
import { useSelector } from "react-redux"; // 1. Import useSelector

const AdminContestPage = () => {
  // 2. Access the user object from the auth slice
  const authState = useSelector((state) => state.auth);

  const token = authState.user?.token || authState.token;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brief: "",
    deadline: "",
    type: "Upcoming",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // DEBUG
    
    if (!token) {
      setMessage("❌ Error: Authorization token missing. Please log in.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Admin/create-contest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the Redux token here
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.msg || "Something went wrong");
      }

      setMessage("✅ Contest created successfully!");
      setFormData({
        title: "",
        description: "",
        brief: "",
        deadline: "",
        type: "Upcoming",
      });
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create Contest</h2>

        {message && <p className="mb-4 text-center font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* DESCRIPTION */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* BRIEF */}
          <input
            type="text"
            name="brief"
            placeholder="Project Brief"
            value={formData.brief}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* DEADLINE */}
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* TYPE */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded bg-white"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminContestPage;
