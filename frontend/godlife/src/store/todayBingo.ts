import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { TodayBingo } from "../types/user";

const initialState: TodayBingo = {
  code: 0,
};

export const todayBingoSlice = createSlice({
  name: "todayBingo",
  initialState,
  reducers: {
    setTodayBingo: (state, action: PayloadAction<TodayBingo>) => {
      return (state = { ...action.payload });
    },
  },
});

export const { setTodayBingo } = todayBingoSlice.actions;

export const selectTodayBingo = (state: RootState) => state.todayBingo;

export default todayBingoSlice.reducer;
