import { createSlice } from "@reduxjs/toolkit";
import {
  saveToStorage,
  removeFormStorage,
} from "../components/localStorage/storage";

const initialAuthState = {
  currentAcc: {},
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    ON_LOGIN(state, action) {
      state.currentAcc = action.payload;
      state.isLogged = true;

      // Lưu thông tin người dùng vào local
      saveToStorage("currentAcc", action.payload);
    },

    ON_LOGOUT(state) {
      state.currentAcc = {};
      state.isLogged = false;
      console.log("yes");

      // Xóa thông tin người dùng khỏi local
      removeFormStorage("currentAcc");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
