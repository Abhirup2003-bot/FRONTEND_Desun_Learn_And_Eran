import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/authSlice/loginSlice";
import authReducer from "../features/authSlice/signupSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
  },
});
