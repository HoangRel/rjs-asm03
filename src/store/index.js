import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./popup";
import categoryReducer from "./category";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    category: categoryReducer,
  },
});

export default store;
