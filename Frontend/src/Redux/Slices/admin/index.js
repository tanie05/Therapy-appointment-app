import { createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
  initialState: {
    paneList: ["Client"],
    isClose: false,
    userData: [],
    errorText: "",
  },
  name: "admin",
  reducers: {
    paneList: (state, action) => {
      console.log("here");
      return {
        ...state,
        [paneList]: action.payload.lst,
      };
    },
    isClose: (state, action) => {
      return {
        ...state,
        isClose: action.payload,
      };
    },
    userData: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    },
    total: (state, action) => {
      return {
        ...state,
        total: action.payload,
      };
    },
    filter: (state, action) => {
      return { ...state, filter: action.payload };
    },
    page: (state, action) => {
      return { ...state, page: action.payload };
    },
    errorText: (state, action) => {
      return { ...state, errorText: action.payload };
    },
  },
});

export const { paneList, isClose, userData, filter, page, errorText, total } =
  adminSlice.actions;
export default adminSlice.reducer;
