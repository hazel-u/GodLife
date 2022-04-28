import { Alert, Snackbar } from "@mui/material";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearSnackbar, selectSnackbar } from "../../store/snackbar";

const CommonSnackbar = () => {
  const { open, message, severity } = useAppSelector(selectSnackbar);

  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
