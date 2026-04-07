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

  // STATES
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  // FETCH USERS
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // FILTER USERS
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userName =
        user?.userName?.toLowerCase() || user?.name?.toLowerCase() || "";
      const userEmail = user?.email?.toLowerCase() || "";
      const query = search.toLowerCase();

      return userName.includes(query) || userEmail.includes(query);
    });
  }, [users, search]);

  // EDIT
  const handleEdit = (user) => {
    setEditUser(user);
    setName(user?.userName || user?.name || "");
    setPhoneNumber(user?.phoneNumber || "");
    setRole(user?.role || "");
  };

  // CLOSE MODAL ✅ FIX
  const handleClose = () => {
    setEditUser(null);
    setName("");
    setPhoneNumber("");
    setRole("");
  };

  // UPDATE
  const token = useSelector((state) => state.auth?.token);

  const handleUpdate = async () => {
    try {
      const userData = {
        userName: name,
        phoneNumber,
        role,
      };

      await dispatch(
        updateUser({
          id: editUser?._id,
          userData,
          token,
        }),
      ).unwrap();

      handleClose();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
    }
  };
  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
    } catch (err) {
      console.error("DELETE ERROR:", err);
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
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      role={role}
      setRole={setRole}
      handleUpdate={handleUpdate}
      handleClose={handleClose} // ✅ IMPORTANT
    />
  );
};

export default AdminUserPage;
