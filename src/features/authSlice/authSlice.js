import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ================= LOAD FROM LOCAL STORAGE =================
const savedAuth = JSON.parse(localStorage.getItem("auth"));

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/logInUser",
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
        "https://backend-ly6h.onrender.com/app/v1/Learn/register",
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
        "https://backend-ly6h.onrender.com/app/v1/Learn/logOutUser",
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

// ================= FORGOT PASSWORD =================
export const forgetPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/forget-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Failed to send reset email");
      }

      return data;
    } catch {
      return rejectWithValue("Server not reachable");
    }
  },
);

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: savedAuth?.isLoggedIn || false,
    user: savedAuth?.user || null,
    token: savedAuth?.token || null,
    loading: false,
    error: null,
  },
  reducers: {},
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

        const userData = action.payload?.data || action.payload?.user || null;

        const token =
          action.payload?.accessToken || action.payload?.token || null;

        state.user = userData;
        state.token = token;

        // ✅ SAVE TO LOCAL STORAGE
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: userData,
            token: token,
            isLoggedIn: true,
          }),
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REGISTER (🔥 FIXED) =================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ SAME LOGIC AS LOGIN
        const userData = action.payload?.data || action.payload?.user || null;

        const token =
          action.payload?.accessToken || action.payload?.token || null;

        state.isLoggedIn = true;
        state.user = userData;
        state.token = token;

        // ✅ SAVE TO LOCAL STORAGE
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: userData,
            token: token,
            isLoggedIn: true,
          }),
        );
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
        state.token = null;

        // ✅ CLEAR STORAGE
        localStorage.removeItem("auth");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= FORGOT PASSWORD =================
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
