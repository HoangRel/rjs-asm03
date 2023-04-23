import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./popup";
import categoryReducer from "./category";
import authReducer from "./auth";
import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    category: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
