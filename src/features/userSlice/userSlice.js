import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://backend-ly6h.onrender.com/app/v1/Admin";

// ✅ GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const rawToken = state.auth.user?.token || state.auth.token;
      const token = rawToken?.replace(/['"]+/g, "");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const res = await fetch(`${API_BASE}/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      // console.log("GET USERS RESPONSE:", data);

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch users");
      }

      // ✅ IMPORTANT FIX (your backend uses msg)
      const users = data.msg || data.users || data.data || data || [];

      return Array.isArray(users) ? users : [];
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch users");
    }
  },
);

// ✅ DELETE USER
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const rawToken = state.auth.user?.token || state.auth.token;
      const token = rawToken?.replace(/['"]+/g, "");

      const res = await fetch(`${API_BASE}/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      if (!res.ok) {
        return rejectWithValue(data.message || "Delete failed");
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Delete failed");
    }
  },
);

// ✅ UPDATE USER
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const rawToken = state.auth.user?.token || state.auth.token;
      const token = rawToken?.replace(/['"]+/g, "");

      const res = await fetch(`${API_BASE}/update-user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      console.log("UPDATE RESPONSE:", data);

      if (!res.ok) {
        return rejectWithValue(data.message || "Update failed");
      }

      return data.user || data.data;
    } catch (err) {
      return rejectWithValue(err.message || "Update failed");
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ GET USERS
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.users = [];
      })

      // ✅ DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.message = "User deleted successfully";
      })

      // ✅ UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        );
        state.message = "User updated successfully";
      });
  },
});

export default userSlice.reducer;
