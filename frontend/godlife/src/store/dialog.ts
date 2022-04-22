import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { CommonDialogType } from "../types/commonComponents";

const initialState: CommonDialogType = {
  open: false,
  title: "",
  content: "",
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<CommonDialogType>) => {
      return (state = { ...action.payload });
    },
    clearDialog: (state) => {
      state.open = false;
    },
  },
});

export const { setDialog, clearDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
