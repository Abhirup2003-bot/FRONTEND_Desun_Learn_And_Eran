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

/* ================= CREATE CONTEST ================= */
export const createContest = createAsyncThunk(
  "contest/createContest",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      // ✅ VALIDATION
      if (!token) return rejectWithValue("❌ Authorization token missing.");
      if (!formData.image) return rejectWithValue("❌ Image is required");
      if (!formData.title || !formData.description || !formData.brief)
        return rejectWithValue("❌ All fields are required");
      if (Number(formData.prizes) < 0)
        return rejectWithValue("❌ Prize must be a positive number");
      if (new Date(formData.deadline) <= new Date(formData.startingDate))
        return rejectWithValue("❌ Deadline must be after starting date");

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("brief", formData.brief);
      fd.append("deadline", formData.deadline);
      fd.append("type", formData.type);
      fd.append("startingDate", formData.startingDate);
      fd.append("prizes", formData.prizes.toString());
      fd.append("image", formData.image);

      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Admin/create-contest",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        },
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.msg || "Create failed");
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
      if (formData.image) fd.append("image", formData.image);

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
      if (!res.ok) return rejectWithValue(data?.msg || "Update failed");

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
      if (!res.ok) return rejectWithValue(data?.msg || "Delete failed");

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
    message: "",
  },
  reducers: {
    resetContestState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /* GET */
      .addCase(getContest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(getContest.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload || [];
      })
      .addCase(getContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createContest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(createContest.fulfilled, (state, action) => {
        state.loading = false;
        state.contests.push(action.payload);
        state.message = "✅ Contest created successfully!";
      })
      .addCase(createContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
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

export const { resetContestState } = contestSlice.actions;
export default contestSlice.reducer;
