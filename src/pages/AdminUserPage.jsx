import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../features/userSlice/userSlice";
import AdminUsersPageUI from "../ui/AdminUsersPageUI";

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    message,
    error,
  } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Safe filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userName = user?.name?.toLowerCase() || "";
      const userEmail = user?.email?.toLowerCase() || "";
      const query = search.toLowerCase();
      return userName.includes(query) || userEmail.includes(query);
    });
  }, [users, search]);

  const handleEdit = (user) => {
    setEditUser(user);
    setName(user?.name || "");
  };

  const handleUpdate = async () => {
    if (!name.trim()) return;

    try {
      await dispatch(
        updateUser({
          id: editUser._id,
          updatedData: { name },
        }),
      ).unwrap();

      setEditUser(null);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminUsersPageUI
      search={search}
      setSearch={setSearch}
      filteredUsers={filteredUsers}
      loading={loading}
      message={message}
      error={error}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      editUser={editUser}
      name={name}
      setName={setName}
      handleUpdate={handleUpdate}
    />
  );
};

export default AdminUserPage;
