import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./Slices/admin";
import userSlice from "./Slices/user";
import userInfoSlice from "./Slices/userInfo"

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    user: userSlice,
    userInfo: userInfoSlice
  },
});

