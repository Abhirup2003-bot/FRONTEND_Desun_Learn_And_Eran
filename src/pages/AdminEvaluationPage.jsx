import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AdminEvaluationPage() {
  const { teamId } = useParams();

  const teamName = teamId; // rename for clarity

  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    position: "",
    prizeMoney: "",
    quality: "",
    creativity: "",
    completion: "",
    usability: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { position, prizeMoney, quality, creativity, completion, usability } =
      formData;

    if (
      !position ||
      !teamName ||
      !quality ||
      !creativity ||
      !completion ||
      !usability
    ) {
      return toast.error("All fields are required ⚠️");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Admin/winner-contest/${teamName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            position,
            prizeMoney,
            quality,
            creativity,
            completion,
            usability,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.msg || "Failed to declare winner");
      }

      toast.success("🏆 Winner declared successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Evaluation Page</h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          Team Name: {teamName}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="position"
            placeholder="Position"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="number"
            name="prizeMoney"
            placeholder="Prize Money"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="number"
            name="quality"
            placeholder="Quality (1-5)"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="number"
            name="creativity"
            placeholder="Creativity (1-5)"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="number"
            name="completion"
            placeholder="Completion (1-5)"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="number"
            name="usability"
            placeholder="Usability (1-5)"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Declare Winner"}
          </button>
        </form>
      </div>
    </div>
  );
}
