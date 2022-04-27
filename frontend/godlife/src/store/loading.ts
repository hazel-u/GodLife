import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

const initialState: boolean = false;

export const loadingSlice = createSlice({
  name: "todayBingo",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;
