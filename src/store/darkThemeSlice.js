import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: false,
};

const darkTheme = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});
export const darkThemeActions = darkTheme.actions;

export default darkTheme.reducer;
