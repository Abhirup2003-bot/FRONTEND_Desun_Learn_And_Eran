import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getContest = createAsyncThunk(
  "contest/getContest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Learn/get-all-contest",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Server returned non-JSON response:", text);
        return rejectWithValue("Server error: Received HTML instead of JSON");
      }

      const data = await res.json();

      console.log("API RESPONSE 👉", data);

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Failed to fetch contests");
      }

      return data.data; // ✅ IMPORTANT
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const contestSlice = createSlice({
  name: "contest",
  initialState: {
    contests: [], // ✅ consistent naming
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContest.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload || []; // ✅ FIX
      })
      .addCase(getContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contestSlice.reducer;
