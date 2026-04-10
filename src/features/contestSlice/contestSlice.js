// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// /* ================= GET ================= */
// export const getContest = createAsyncThunk(
//   "contest/getContest",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(
//         "https://backend-ly6h.onrender.com/app/v1/Learn/get-all-contest",
//       );
//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data?.msg || "Failed");
//       }

//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// /* ================= CREATE ================= */
// export const createContest = createAsyncThunk(
//   "contest/createContest",
//   async ({ formData, token }, { rejectWithValue }) => {
//     try {
//       if (!token) return rejectWithValue("No token");

//       const fd = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key]) fd.append(key, formData[key]);
//       });

//       const res = await fetch(
//         "https://backend-ly6h.onrender.com/app/v1/Admin/create-contest",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: fd,
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) return rejectWithValue(data?.msg);

//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// /* ================= UPDATE ================= */
// export const updateContest = createAsyncThunk(
//   "contest/updateContest",
//   async ({ id, formData, token }, { rejectWithValue }) => {
//     try {
//       if (!token) return rejectWithValue("No token");

//       const fd = new FormData();
//       fd.append("title", formData.title);
//       fd.append("description", formData.description);
//       fd.append("brief", formData.brief);
//       fd.append("startingDate", formData.startingDate);
//       fd.append("deadline", formData.deadline);
//       fd.append("type", formData.type);
//       fd.append("prizes", String(formData.prizes));

//       if (formData.image) {
//         fd.append("image", formData.image);
//       }

//       const res = await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Admin/update-contest/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: fd,
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data?.msg || "Update failed");
//       }

//       return data.data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// /* ================= DELETE ================= */
// export const deleteContest = createAsyncThunk(
//   "contest/deleteContest",
//   async ({ id, token }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Admin/delete-contest/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) return rejectWithValue(data?.msg);

//       return id;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// /* ================= PARTICIPATE ================= */
// export const participateInContest = createAsyncThunk(
//   "contest/participate",
//   async ({ contestId, teamId, token }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(
//         `https://backend-ly6h.onrender.com/app/v1/Learn/perticipating/${contestId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // ✅ FIX
//           },
//           body: JSON.stringify({ teamId }),
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data?.msg || "Participation failed");
//       }

//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// /* ================= SLICE ================= */
// const contestSlice = createSlice({
//   name: "contest",
//   initialState: {
//     contests: [],
//     loading: false,
//     error: null,
//     message: "",
//   },
//   reducers: {
//     clearMessage: (state) => {
//       state.message = "";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* GET */
//       .addCase(getContest.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getContest.fulfilled, (state, action) => {
//         state.loading = false;
//         state.contests = action.payload || [];
//       })
//       .addCase(getContest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* CREATE */
//       .addCase(createContest.fulfilled, (state, action) => {
//         state.contests.push(action.payload);
//         state.message = "Created successfully";
//       })

//       /* UPDATE */
//       .addCase(updateContest.fulfilled, (state, action) => {
//         const updated = action.payload;

//         const index = state.contests.findIndex((c) => c._id === updated._id);

//         if (index !== -1) {
//           state.contests[index] = updated;
//         }

//         state.message = "Updated successfully";
//       })

//       /* DELETE */
//       .addCase(deleteContest.fulfilled, (state, action) => {
//         state.contests = state.contests.filter((c) => c._id !== action.payload);
//       })

//       /* PARTICIPATE */
//       .addCase(participateInContest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(participateInContest.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload.msg;
//       })
//       .addCase(participateInContest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearMessage } = contestSlice.actions;

// export default contestSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= SAFE ERROR PARSER ================= */
const getErrorMessage = (data, fallback) => {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  return data.msg || data.message || fallback;
};

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
        return rejectWithValue(
          getErrorMessage(data, "Failed to load contests"),
        );
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

      if (!res.ok) {
        return rejectWithValue(getErrorMessage(data, "Create failed"));
      }

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
      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) fd.append(key, formData[key]);
      });

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
        return rejectWithValue(getErrorMessage(data, "Update failed"));
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

      if (!res.ok) {
        return rejectWithValue(getErrorMessage(data, "Delete failed"));
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ================= PARTICIPATE (FIXED) ================= */
export const participateInContest = createAsyncThunk(
  "contest/participate",
  async ({ contestId, teamId, token }, { rejectWithValue }) => {
    try {
      /* ================= SAFETY ================= */
      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      if (!contestId) {
        return rejectWithValue("Contest ID missing");
      }

      if (!teamId) {
        return rejectWithValue("Team ID missing");
      }

      console.log("📤 API REQUEST:", {
        contestId,
        teamId,
        tokenExists: !!token,
      });

      /* ================= API CALL ================= */
      const res = await fetch(
        // 🔥 MAKE SURE THIS MATCHES YOUR BACKEND ROUTE
        `https://backend-ly6h.onrender.com/app/v1/Learn/perticipate-as-team/${contestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ teamId }), // ✅ correct
        },
      );

      const data = await res.json();

      console.log("📥 API RESPONSE:", data);

      /* ================= ERROR HANDLING ================= */
      if (!res.ok) {
        return rejectWithValue(data?.msg || "Participation failed");
      }

      return data;
    } catch (err) {
      console.log("🔥 THUNK ERROR:", err);
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
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContest.fulfilled, (state, action) => {
        state.contests = action.payload || [];
      })

      .addCase(participateInContest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(participateInContest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.msg || "Joined successfully";
      })

      .addCase(participateInContest.rejected, (state, action) => {
        state.loading = false;

        console.log("❌ REDUX ERROR:", action.payload);

        state.error = action.payload;
      });
  },
});

export const { clearMessage } = contestSlice.actions;
export default contestSlice.reducer;
