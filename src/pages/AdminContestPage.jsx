// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const AdminContestPage = () => {
//   const authState = useSelector((state) => state.auth);
//   const token = authState.user?.token || authState.token;

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     brief: "",
//     image: null,
//     deadline: "",
//     type: "Upcoming",
//     startingDate: "",
//     prizes: 0, // ✅ number
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, image: files[0] }));
//     } else if (name === "prizes") {
//       setFormData((prev) => ({
//         ...prev,
//         prizes: Number(value), // ✅ convert to number
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       setMessage("❌ Authorization token missing.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const form = new FormData();

//       form.append("title", formData.title);
//       form.append("description", formData.description);
//       form.append("brief", formData.brief);
//       form.append("deadline", formData.deadline);
//       form.append("type", formData.type);
//       form.append("startingDate", formData.startingDate);

//       // ✅ number only
//       form.append("prizes", Number(formData.prizes));

//       // ✅ safe image
//       if (formData.image) {
//         form.append("image", formData.image);
//       }

//       const res = await fetch(
//         "https://backend-three-tau-88.vercel.app/app/v1/Admin/create-contest",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: form,
//         },
//       );

//       const text = await res.text();

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         console.error("Server returned HTML:", text);
//         throw new Error("Server error (invalid response)");
//       }

//       if (!res.ok) {
//         throw new Error(data?.msg || "Something went wrong");
//       }

//       setMessage("✅ Contest created successfully!");

//       // ✅ reset form
//       setFormData({
//         title: "",
//         description: "",
//         brief: "",
//         image: null,
//         deadline: "",
//         type: "Upcoming",
//         startingDate: "",
//         prizes: 0,
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage(`❌ ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
//         <h2 className="text-2xl font-bold mb-6">Create Contest</h2>

//         {message && <p className="mb-4 text-center font-medium">{message}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="brief"
//             placeholder="Project Brief"
//             value={formData.brief}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           />

//           <input
//             type="date"
//             name="startingDate"
//             value={formData.startingDate}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           />

//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="prizes"
//             placeholder="Prize Amount"
//             value={formData.prizes}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             min="0"
//           />

//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="w-full border p-3 rounded bg-white"
//           >
//             <option value="Upcoming">Upcoming</option>
//             <option value="Ongoing">Ongoing</option>
//             <option value="Completed">Completed</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
//           >
//             {loading ? "Creating..." : "Create Contest"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminContestPage;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const AdminContestPage = () => {
//   const authState = useSelector((state) => state.auth);
//   const token = authState.user?.token || authState.token;

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     brief: "",
//     image: null,
//     deadline: "",
//     type: "Upcoming",
//     startingDate: "",
//     prizes: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       setFormData((prev) => ({
//         ...prev,
//         image: files[0],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (loading) return;

//     if (!token) {
//       setMessage("❌ Authorization token missing.");
//       return;
//     }

//     // ✅ Validation
//     if (!formData.image) {
//       setMessage("❌ Image is required");
//       return;
//     }

//     if (!formData.title || !formData.description || !formData.brief) {
//       setMessage("❌ All fields are required");
//       return;
//     }

//     if (Number(formData.prizes) < 0) {
//       setMessage("❌ Prize must be a positive number");
//       return;
//     }

//     if (new Date(formData.deadline) <= new Date(formData.startingDate)) {
//       setMessage("❌ Deadline must be after starting date");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const fd = new FormData();

//       fd.append("title", formData.title);
//       fd.append("description", formData.description);
//       fd.append("brief", formData.brief);
//       fd.append("deadline", formData.deadline);
//       fd.append("type", formData.type);
//       fd.append("startingDate", formData.startingDate);
//       fd.append("prizes", formData.prizes.toString()); // ✅ number
//       fd.append("image", formData.image); // ✅ file

//       // 🔍 Debug
//       console.log("TOKEN:", token);
//       console.log("FORM DATA:");
//       for (let pair of fd.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const res = await fetch(
//         "https://backend-three-tau-88.vercel.app/app/v1/Admin/create-contest",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // ❌ DO NOT add Content-Type manually
//           },
//           body: fd,
//         },
//       );

//       const text = await res.text();

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         console.error("Server returned:", text);
//         throw new Error("Invalid server response");
//       }

//       if (!res.ok) {
//         throw new Error(data?.msg || "Request failed");
//       }

//       setMessage("✅ Contest created successfully!");

//       // ✅ Reset form
//       setFormData({
//         title: "",
//         description: "",
//         brief: "",
//         image: null,
//         deadline: "",
//         type: "Upcoming",
//         startingDate: "",
//         prizes: "",
//       });

//       // ✅ Reset file input manually
//       document.querySelector('input[type="file"]').value = "";
//     } catch (error) {
//       console.error(error);
//       setMessage(`❌ ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
//         <h2 className="text-2xl font-bold mb-6">Create Contest</h2>

//         {message && <p className="mb-4 text-center font-medium">{message}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="brief"
//             placeholder="Project Brief"
//             value={formData.brief}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="date"
//             name="startingDate"
//             value={formData.startingDate}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="prizes"
//             placeholder="Prize Amount"
//             value={formData.prizes}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             min="0"
//             required
//           />

//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="w-full border p-3 rounded bg-white"
//           >
//             <option value="Upcoming">Upcoming</option>
//             <option value="Ongoing">Ongoing</option>
//             <option value="Completed">Completed</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
//           >
//             {loading ? "Creating..." : "Create Contest"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminContestPage;

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContest,
  createContest,
  updateContest,
  deleteContest,
  resetContestState,
} from "../features/contestSlice/contestSlice";

const AdminContestPage = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const { contests, loading, error, message } = useSelector(
    (state) => state.contest,
  );
  const authState = useSelector((state) => state.auth);
  const token = authState?.token || authState?.user?.token || null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brief: "",
    image: null,
    startingDate: "",
    deadline: "",
    type: "Upcoming",
    prizes: "",
    _id: null, // for editing
  });

  // Fetch contests on load
  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      // Edit
      dispatch(updateContest({ id: formData._id, formData, token }))
        .unwrap()
        .then(() => resetForm())
        .catch(() => {});
    } else {
      // Create
      dispatch(createContest({ formData, token }))
        .unwrap()
        .then(() => resetForm())
        .catch(() => {});
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      brief: "",
      image: null,
      startingDate: "",
      deadline: "",
      type: "Upcoming",
      prizes: "",
      _id: null,
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = (contest) => {
    setFormData({
      title: contest.title,
      description: contest.description,
      brief: contest.brief,
      image: null, // user can replace
      startingDate: new Date(contest.startingDate).toISOString().slice(0, 16),
      deadline: new Date(contest.deadline).toISOString().slice(0, 16),
      type: contest.type,
      prizes: contest.prizes,
      _id: contest._id,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      dispatch(deleteContest({ id, token }));
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Contest Page</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded mb-6 space-y-3"
      >
        {message && (
          <div className="p-2 bg-green-200 text-green-800 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="p-2 bg-red-200 text-red-800 rounded">{error}</div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="brief"
          placeholder="Brief"
          value={formData.brief}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          name="image"
          ref={fileRef}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="datetime-local"
          name="startingDate"
          value={formData.startingDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="number"
          name="prizes"
          placeholder="Prizes"
          value={formData.prizes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {formData._id ? "Update Contest" : "Create Contest"}
        </button>
        {formData._id && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* CONTEST LIST */}
      <h2 className="text-xl font-bold mb-2">All Contests</h2>
      {loading && <p>Loading...</p>}
      {contests.length === 0 && <p>No contests available</p>}
      <div className="space-y-2">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{contest.title}</h3>
              <p>{contest.brief}</p>
              <p>Type: {contest.type}</p>
              <p>Prizes: {contest.prizes}</p>
              <p>
                Start: {new Date(contest.startingDate).toLocaleString()} | End:{" "}
                {new Date(contest.deadline).toLocaleString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(contest)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contest._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContestPage;
