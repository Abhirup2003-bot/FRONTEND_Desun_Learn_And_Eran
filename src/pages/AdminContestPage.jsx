import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminContestPageUI from "../ui/AdminContestPageUI";
import {
  getContest,
  createContest,
  updateContest,
  deleteContest,
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
    _id: null,
  });

  useEffect(() => {
    dispatch(getContest());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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

  // ✅ FIXED HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData._id) {
      dispatch(updateContest({ id: formData._id, formData, token }))
        .unwrap()
        .then(() => {
          dispatch(getContest()); // 🔥 refresh UI
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(createContest({ formData, token }))
        .unwrap()
        .then(() => {
          dispatch(getContest()); // 🔥 refresh UI
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (contest) => {
    setFormData({
      title: contest.title || "",
      description: contest.description || "",
      brief: contest.brief || "",
      image: null,
      startingDate: formatDate(contest.startingDate),
      deadline: formatDate(contest.deadline),
      type: contest.type || "Upcoming",
      prizes: contest.prizes || "",
      _id: contest._id,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ FIXED DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      dispatch(deleteContest({ id, token }))
        .unwrap()
        .then(() => dispatch(getContest())); // 🔥 refresh
    }
  };

  return (
    <AdminContestPageUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      resetForm={resetForm}
      contests={contests}
      loading={loading}
      message={message}
      error={error}
      fileRef={fileRef}
    />
  );
};

export default AdminContestPage;
