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
    (state) => state.contest
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
    participationType: "solo", // ✅ ADDED
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

    if (files) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      brief: "",
      image: null,
      imagePreview: null,
      startingDate: "",
      deadline: "",
      type: "Upcoming",
      prizes: "",
      participationType: "solo", // ✅ RESET
      _id: null,
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData._id) {
      dispatch(updateContest({ id: formData._id, formData, token }))
        .unwrap()
        .then(() => {
          dispatch(getContest());
          resetForm();
        })
        .catch(console.error);
    } else {
      dispatch(createContest({ formData, token }))
        .unwrap()
        .then(() => {
          dispatch(getContest());
          resetForm();
        })
        .catch(console.error);
    }
  };

  const handleEdit = (contest) => {
    setFormData({
      title: contest.title || "",
      description: contest.description || "",
      brief: contest.brief || "",
      image: null,
      imagePreview: contest.image || null,
      startingDate: formatDate(contest.startingDate),
      deadline: formatDate(contest.deadline),
      type: contest.type || "Upcoming",
      prizes: contest.prizes || "",
      participationType: contest.participationType || "solo", // ✅ ADDED
      _id: contest._id,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      dispatch(deleteContest({ id, token }))
        .unwrap()
        .then(() => dispatch(getContest()));
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