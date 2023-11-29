import { createSlice } from "@reduxjs/toolkit";

// that is initial state
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    signInFailure: (state, action) => {
      // console.log("failure", action);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInSuccess, signInStart, signInFailure } = userSlice.actions;
export default userSlice.reducer;
