// storing userInfo in this slice - userId, first and lastname and token, role and isLoggedIn flag
import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("user")) || {
    isLoggedIn: false,
    name: {
      firstName: "",
      lastName: "",
    },
  },
  name: "userInfo",
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return { isLoggedIn: false };
    },
    editName: (state, action) => {
      return { ...state, name: action.payload };
    },
  },
});

export const { login, logout, editName } = userInfoSlice.actions;
export default userInfoSlice.reducer;
