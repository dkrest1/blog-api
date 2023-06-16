import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPending: false,
};

export const pendingSlice = createSlice({
  name: "pending",
  initialState,
  reducers: {
    getPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});

export const pending = (state) => state.pending.isPending;
export const { getPending } = pendingSlice.actions;
export default pendingSlice.reducer;
