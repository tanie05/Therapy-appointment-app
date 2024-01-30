import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./Slices/admin";
import userSlice from "./Slices/user";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    user: userSlice,
  },
});
