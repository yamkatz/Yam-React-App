import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
      state.userRole = action.payload?.isBusiness
        ? "business"
        : action.payload?.isAdmin
        ? "admin"
        : "guest";
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = undefined;
      state.userRole = "guest";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
