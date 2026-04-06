import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= GET CONTEST ================= */
export const getContest = createAsyncThunk(
  "contest/getContest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/get-all-contest",
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Failed to fetch contests");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= UPDATE CONTEST ================= */
export const updateContest = createAsyncThunk(
  "contest/updateContest",
  async ({ id, formData, token }, { rejectWithValue }) => {
    try {
      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("brief", formData.brief);
      fd.append("startingDate", new Date(formData.startingDate).toISOString());
      fd.append("deadline", new Date(formData.deadline).toISOString());
      fd.append("type", formData.type);
      fd.append("prizes", String(formData.prizes));

      if (formData.image) {
        fd.append("image", formData.image);
      }

      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Admin/update-contest/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Update failed");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= DELETE CONTEST ================= */
export const deleteContest = createAsyncThunk(
  "contest/deleteContest",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://backend-ly6h.onrender.com/app/v1/Admin/delete-contest/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Delete failed");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/* ================= SLICE ================= */
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
      /* GET */
      .addCase(getContest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContest.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload || [];
      })
      .addCase(getContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateContest.fulfilled, (state, action) => {
        const updated = action.payload;

        state.contests = state.contests.map((contest) =>
          contest._id === updated._id ? updated : contest,
        );
      })

      /* DELETE */
      .addCase(deleteContest.fulfilled, (state, action) => {
        const id = action.payload;

        state.contests = state.contests.filter((contest) => contest._id !== id);
      });
  },
});

export default contestSlice.reducer;
