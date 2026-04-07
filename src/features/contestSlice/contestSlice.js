import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= GET ================= */
export const getContest = createAsyncThunk(
  "contest/getContest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://backend-ly6h.onrender.com/app/v1/Learn/get-all-contest",
      );
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data?.msg || "Failed");
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ================= CREATE ================= */
export const createContest = createAsyncThunk(
  "contest/createContest",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("No token");

      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) fd.append(key, formData[key]);
      });

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

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data?.msg);

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ================= UPDATE ================= */
export const updateContest = createAsyncThunk(
  "contest/updateContest",
  async ({ id, formData, token }, { rejectWithValue }) => {
    try {
      if (!token) return rejectWithValue("No token");

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("brief", formData.brief);
      fd.append("startingDate", formData.startingDate); // ✅ FIXED
      fd.append("deadline", formData.deadline); // ✅ FIXED
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
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ================= DELETE ================= */
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

      if (!res.ok) return rejectWithValue(data?.msg);

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
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

      /* CREATE */
      .addCase(createContest.fulfilled, (state, action) => {
        state.contests.push(action.payload);
        state.message = "Created successfully";
      })

      /* UPDATE */
      .addCase(updateContest.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.contests.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.contests[index] = updated;
        }

        state.message = "Updated successfully";
      })

      /* DELETE */
      .addCase(deleteContest.fulfilled, (state, action) => {
        state.contests = state.contests.filter((c) => c._id !== action.payload);
      });
  },
});

export default contestSlice.reducer;
