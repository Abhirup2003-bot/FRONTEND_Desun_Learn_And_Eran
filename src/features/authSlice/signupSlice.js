import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userName, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, email, password, phoneNumber }),
          credentials: "include",
        },
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return rejectWithValue(data?.msg || "Signup failed ");
      }
      return data;
    } catch (err) {
      return rejectWithValue("Server not reachable");
    }
  },
);

const signupSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;
