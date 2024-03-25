import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    language: null,
  },
  reducers: {
    setLanguage(state, { payload }) {
      state.language = payload;
    },
  },
});

export const { setLanguage } = commonSlice.actions;

export default commonSlice.reducer;
