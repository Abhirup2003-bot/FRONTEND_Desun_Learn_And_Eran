import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createContest = createAsyncThunk(
  "contest/createContest",
  async (contestData, { rejectWithValue }) => {
    try {
      console.log("Sending contestData:", contestData);
      const token = getState().auth.token;

      console.log("Token:", token);
      const res = await fetch(
        "https://backend-three-tau-88.vercel.app/app/v1/Admin/create-contest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: contestData.title,
            description: contestData.description,
            brief: contestData.brief,
            deadline: contestData.deadline,
            type: contestData.type,
          }),
        },
      );

      const data = await res.json();
      console.log("Sending data:", contestData);
      console.log("Backend response:", data);

      if (!res.ok) {
        return rejectWithValue(data.msg);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const contestSlice = createSlice({
  name: "contest",
  initialState: {
    contests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContest.fulfilled, (state, action) => {
        state.loading = false;
        state.contests.push(action.payload);
      })
      .addCase(createContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contestSlice.reducer;
