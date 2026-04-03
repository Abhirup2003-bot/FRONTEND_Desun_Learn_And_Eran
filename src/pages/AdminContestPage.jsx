import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContest } from "../features/contestSlice/contestSlice";

const AdminContestPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brief: "",

    deadline: "",
    type: "Upcoming",
  });

  const [preview, setPreview] = useState(null);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  // REWARD CHANGE
  // const handleRewardChange = (field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     rewards: {
  //       ...prev.rewards,
  //       [field]: value,
  //     },
  //   }));
  // };

  // IMAGE
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: file,
  //     }));

  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      description: formData.description,
      brief: formData.brief,
      // startingDate: formData.startingDate,
      deadline: formData.deadline,
      type: formData.type,
      // rewards: {
      //   position: formData.rewards.position,
      //   amount: Number(formData.rewards.amount),
      // },
    };

    console.log(data);

    dispatch(createContest(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create Contest</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* DESCRIPTION */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* BRIEF */}
          <input
            type="text"
            name="brief"
            placeholder="Project Brief"
            value={formData.brief || ""}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* DATES */}
          <div className="flex gap-4">
            {/* <input
              type="date"
              name="startingDate"
              value={formData.startingDate || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            /> */}

            <input
              type="date"
              name="deadline"
              value={formData.deadline || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* ✅ TYPE DROPDOWN */}
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

          {/* REWARDS */}
          {/* <div className="flex gap-4">
            <input
              type="text"
              placeholder="Position (1st, 2nd)"
              value={formData.rewards.position}
              onChange={(e) => handleRewardChange("position", e.target.value)}
              className="w-1/2 border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Amount"
              value={formData.rewards.amount}
              onChange={(e) => handleRewardChange("amount", e.target.value)}
              className="w-1/2 border p-3 rounded"
            />
          </div> */}

          {/* SUBMIT */}
          <button  className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Create Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminContestPage;
