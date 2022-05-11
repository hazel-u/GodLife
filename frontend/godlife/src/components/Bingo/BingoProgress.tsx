import { Stack, useMediaQuery, useTheme } from "@mui/material";

import React from "react";

import { ReactComponent as Godlife } from "../../assets/images/godlife.svg";

const BingoProgress = (props: { value: number }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      margin="20px 0 10px 0"
      spacing={2}
    >
      <Godlife
        fill={1 <= props.value ? "#A11803" : "#464646"}
        width={fullScreen ? "40px" : "60px"}
        height={fullScreen ? "40px" : "60px"}
      />
      <Godlife
        fill={2 <= props.value ? "#A11803" : "#464646"}
        width={fullScreen ? "40px" : "60px"}
        height={fullScreen ? "40px" : "60px"}
      />
      <Godlife
        fill={3 <= props.value ? "#A11803" : "#464646"}
        width={fullScreen ? "40px" : "60px"}
        height={fullScreen ? "40px" : "60px"}
      />
    </Stack>
  );
};

export default BingoProgress;
