import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice.js";
import loadingReducer from "../reducers/LoadingSlice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    loading: loadingReducer,
  },
});
