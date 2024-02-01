import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  initialState: [],
  name: "user",
  reducers: {
    userData: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
