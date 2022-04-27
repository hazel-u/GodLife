import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { BingoType } from "../types/bingo";

const initialState: BingoType = {
  activate: false,
  code: 0,
  commentCnt: 0,
  comments: [],
  godlife: false,
  id: "",
  likeCnt: 0,
  startDate: [],
  title: "",
  userEmail: "",
  userName: "",
  goals: [],
  godCount: 0,
};

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    setBingo: (state, action: PayloadAction<BingoType>) => {
      return (state = { ...action.payload });
    },
  },
});

export const { setBingo } = bingoSlice.actions;

export const selectBingo = (state: RootState) => state.bingo;

export default bingoSlice.reducer;
