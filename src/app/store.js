import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import contestReducer from "../features/contestSlice/contestSlice";
import userReducer from "../features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contest: contestReducer,
    users: userReducer,
  },
});

export default store;
