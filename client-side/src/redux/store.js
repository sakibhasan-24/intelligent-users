import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStorage.js";
export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
