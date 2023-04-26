import { createSlice } from "@reduxjs/toolkit";

import {
  getFromStorage,
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
    GET_CART(state, action) {
      const { userEmail } = action.payload;
      state.userEmail = userEmail;
      const currentCartData = getFromStorage(`cartData_${userEmail}`, []);
      state.cartData = currentCartData;
    },

    ADD_CART(state, action) {
      console.log("add");
      // nhận 2 giá trị từ payload
      const { userEmail, cartData } = action.payload;

      state.userEmail = userEmail;

      const currentCartData = getFromStorage(`cartData_${userEmail}`, []);

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
      console.log("up");
      const { userEmail, productData } = action.payload;

      state.userEmail = userEmail;

      const currentCartData = getFromStorage(`cartData_${userEmail}`, []);

      const index = currentCartData.findIndex(
        (mov) => mov.id === productData.id
      );

      if (index === -1) {
        return;
      }

      // gán giá trị quantity mới
      currentCartData[index].quantity = productData.quantity;

      saveToStorage(`cartData_${userEmail}`, currentCartData);
      state.cartData = currentCartData;
    },

    DELETE_CART(state, action) {
      console.log("dele");
      const { userEmail, productData } = action.payload;

      state.userEmail = userEmail;

      const currentCartData = getFromStorage(`cartData_${userEmail}`, []);

      // lọc ra các phần tử còn lại.
      const updateData = currentCartData.filter(
        (mov) => mov.id !== productData.id
      );

      saveToStorage(`cartData_${userEmail}`, updateData);
      state.cartData = updateData;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
