import { createSlice } from "@reduxjs/toolkit";

import {
  getFormStorage,
  saveToStorage,
} from "../components/localStorage/storage";

const initialCartState = {
  userEmail: "",
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_CART(state, action) {
      // nhận 2 giá trị từ payload
      const { userEmail, cartData } = action.payload;

      state.userEmail = userEmail;

      const currentCartData = getFormStorage(`cartData_${userEmail}`, []);

      const index = currentCartData.findIndex((mov) => mov.id === cartData.id);

      if (index !== -1) {
        currentCartData[index].quantity += cartData.quantity;
      } else {
        currentCartData.push(cartData);
      }

      saveToStorage(`cartData_${userEmail}`, currentCartData);
      state.cartData = currentCartData;
    },

    UPDATE_CART(state, action) {
      const { userEmail, cartData } = action.payload;

      state.userEmail = userEmail;

      const currentCartData = getFormStorage(`cartData_${userEmail}`, []);

      const index = currentCartData.findIndex((mov) => mov.id === cartData.id);

      // gán giá trị quantity mới
      currentCartData[index].quantity = cartData.quantity;

      saveToStorage(`cartData_${userEmail}`, currentCartData);
      state.cartData = currentCartData;
    },

    DELETE_CART(state, action) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
