import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStorage.js";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Reducers in Redux are responsible for handling actions and updating the state of the application
/* 
export const store = configureStore({ ... });: This line creates a Redux store using the configureStore function. The store is a central place to manage the state of the application.

It tells Redux how the application state should be updated in response to actions. Here, it includes a single reducer (userReducer) under the key "user.
*/
