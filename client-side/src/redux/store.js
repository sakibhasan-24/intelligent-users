import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStorage.js";
import { persistReducer } from "redux-persist";
// import { storage } from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage";
// redux-persist/lib/storage
import persistStore from "redux-persist/es/persistStore";
const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  // reducer: { user: userReducer },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Reducers in Redux are responsible for handling actions and updating the state of the application
/* 
export const store = configureStore({ ... });: This line creates a Redux store using the configureStore function. The store is a central place to manage the state of the application.

It tells Redux how the application state should be updated in response to actions. Here, it includes a single reducer (userReducer) under the key "user.
*/
