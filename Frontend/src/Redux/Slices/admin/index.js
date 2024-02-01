import { createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
  initialState: {
    paneList: ["Client"],
    isClose: false,
    userData: [],
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
    filter: (state, action) => {
      return { ...state, filter: action.payload };
    },
    page: (state, action) => {
      return { ...state, page: action.payload };
    },
  },
});

export const { paneList, isClose, userData, filter, page } = adminSlice.actions;
export default adminSlice.reducer;
