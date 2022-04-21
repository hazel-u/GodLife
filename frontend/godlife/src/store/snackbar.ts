import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      console.log("??");
      return (state = { ...action.payload });
    },
    clearSnackbar: () => initialState,
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;
