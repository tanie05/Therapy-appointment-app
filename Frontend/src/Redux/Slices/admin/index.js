import { createSlice } from "@reduxjs/toolkit";
export const adminSlice = createSlice({
  initialState: {
    paneList: ["Admin", "Client", "Admin", "Client"],
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
  },
});

export const { paneList, isClose, userData } = adminSlice.actions;
export default adminSlice.reducer;
