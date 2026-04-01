import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/logInUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Login failed");
      }

      return data;
    } catch {
      return rejectWithValue("Server not reachable");
    }
  },
);

// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userName, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, email, password, phoneNumber }),
          credentials: "include",
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Signup failed");
      }

      return data;
    } catch {
      return rejectWithValue("Server not reachable");
    }
  },
);

// ================= LOGOUT =================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/logOutUser",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Logout failed");
      }

      return true;
    } catch {
      return rejectWithValue("Server not reachable");
    }
  },
);

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;

        // 🔥 FIX: handle all backend response formats
        const userData =
          action.payload?.data || action.payload?.user || action.payload;

        state.user = userData;

        // console.log("LOGIN USER:", userData);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REGISTER =================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.isLoggedIn = false;
        state.user = null;

        // 🔥 FIX: handle all backend response formats
        const userData =
          action.payload?.data || action.payload?.user || action.payload;

        state.user = userData;

        // console.log("REGISTER USER:", userData);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= LOGOUT =================
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
