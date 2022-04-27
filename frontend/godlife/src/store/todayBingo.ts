import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

const initialState: number = 0;

export const todayBingoSlice = createSlice({
  name: "todayBingo",
  initialState,
  reducers: {
    setTodayBingo: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const { setTodayBingo } = todayBingoSlice.actions;

export const selectTodayBingo = (state: RootState) => state.todayBingo;

export default todayBingoSlice.reducer;
