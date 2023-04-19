import { createSlice } from "@reduxjs/toolkit";

const initialPopupState = { data: null, isShowPopup: false };

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    showPopup(state, action) {
      state.data = action.payload;
      state.isShowPopup = true;
    },

    hidePopup(state) {
      state.isShowPopup = false;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
