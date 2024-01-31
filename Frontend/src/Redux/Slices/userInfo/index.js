// storing userInfo in this slice - userId, first and lastname and token, role and isLoggedIn flag
import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  initialState: {isLoggedIn: false, name: {
    firstName: "Tanvi",
    lastName:"Sharma"
  }},
  name: "userInfo",
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return {isLoggedIn: false};
    },
  },
});

export const { login, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;
