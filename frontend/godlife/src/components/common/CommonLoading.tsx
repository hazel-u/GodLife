import { Backdrop, CircularProgress } from "@mui/material";

import React from "react";

import { useAppSelector } from "../../store/hooks";
import { selectLoading } from "../../store/loading";

const CommonLoading = () => {
  const open = useAppSelector(selectLoading);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CommonLoading;
