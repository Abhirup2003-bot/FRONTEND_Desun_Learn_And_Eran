import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../features/userSlice/userSlice";

const AdminUsersPage = () => {
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

  // ✅ FIX 1: Safe filtering (avoid crash if undefined)
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

  // ✅ FIX 2: Prevent empty update + handle async properly
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

  // ✅ FIX 3: Confirm before delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center mb-4">
        <h2 className="text-xl font-bold">Users Management</h2>

        <input
          type="text"
          placeholder="Search users..."
          className="border px-3 py-2 rounded w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ Messages */}
      {message && <p className="mb-3 text-green-600 font-medium">{message}</p>}
      {error && <p className="mb-3 text-red-600 font-medium">{error}</p>}

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {user?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">{user?.email || "N/A"}</td>

                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-400 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-80 shadow-lg">
            <h3 className="font-bold mb-3">Edit User</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              placeholder="Enter name"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEditUser(null);
                  setName("");
                }}
                className="bg-gray-400 px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
