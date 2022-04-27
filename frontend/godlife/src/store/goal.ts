import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { GoalType } from "../types/goal";

const initialState: GoalType[] = [];

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    setGoal: (state, action: PayloadAction<GoalType[]>) => {
      return (state = [...action.payload, ...state]);
    },
    deleteGoal: (state, { payload }) => {
      return state.filter(({ seq }) => seq !== payload.seq);
    },
  },
});

export const { setGoal, deleteGoal } = goalSlice.actions;

export const selectGoal = (state: RootState) => state.goal;

export default goalSlice.reducer;
