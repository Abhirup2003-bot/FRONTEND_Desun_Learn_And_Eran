import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://backend-ly6h.onrender.com/app/v1/Admin";

// ✅ Helper to extract token safely
const getToken = (state) => {
  const rawToken = state.auth.user?.token || state.auth.token;
  return rawToken ? rawToken.replace(/['"]+/g, "") : null;
};

// ✅ GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      if (!token) return rejectWithValue("No token found");

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

      const users = data.msg || data.users || data.data || data;

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
      const token = getToken(getState());

      const res = await fetch(`${API_BASE}/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      if (!res.ok) {
        return rejectWithValue(data.message || data.msg || "Delete failed");
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Delete failed");
    }
  },
);

// ✅ UPDATE USER (FULLY FIXED)
// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async ({ id, updatedData }, { getState, rejectWithValue }) => {
//     try {
//       const token = getToken(getState());

//       if (!token) return rejectWithValue("No token found");

//       const res = await fetch(`${API_BASE}/update-user/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();
//       console.log("UPDATE RESPONSE:", data);

//       if (!res.ok) {
//         return rejectWithValue(data.message || data.msg || "Update failed");
//       }

//       // ✅ handle all backend formats
//       const updatedUser =
//         data.user || data.data || data.msg || data.updatedUser;

//       // ❌ safety check
//       if (!updatedUser || !updatedUser._id) {
//         return rejectWithValue("Invalid user data from server");
//       }

//       return updatedUser;
//     } catch (err) {
//       return rejectWithValue(err.message || "Update failed");
//     }
//   },
// );
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Admin/update-user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // ✅ MUST
            Authorization: `Bearer ${token}`, // ✅ if protected
          },
          body: JSON.stringify(userData), // ✅ IMPORTANT
        },
      );

      const data = await res.json();

      // console.log("UPDATE RESPONSE:", data);

      if (!res.ok) {
        return rejectWithValue(data.msg);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ✅ SLICE
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =========================
      // GET USERS
      // =========================
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

      // =========================
      // DELETE USER
      // =========================
      .addCase(deleteUser.pending, (state) => {
        state.message = "";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.message = "User deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // =========================
      // UPDATE USER
      // =========================
      .addCase(updateUser.pending, (state) => {
        state.message = "";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.users = state.users.map((user) =>
          user._id === action.payload._id
            ? { ...user, ...action.payload } // ✅ safe merge
            : user,
        );

        state.message = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || "Update failed";
      });
  },
});

export const { clearMessage, clearError } = userSlice.actions;

export default userSlice.reducer;
