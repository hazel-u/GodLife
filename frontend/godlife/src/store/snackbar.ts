import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { CommonSnackbarType } from "../types/commonComponents";

const initialState: CommonSnackbarType = {
  open: false,
  message: "",
  severity: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<CommonSnackbarType>) => {
      return (state = { ...action.payload });
    },
    clearSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;
