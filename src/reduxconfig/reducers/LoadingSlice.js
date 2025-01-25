import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default LoadingSlice.reducer;
export const { setLoading } = LoadingSlice.actions;
