import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import React from "react";
import { useState } from "react";

interface BingoCellProp {
  content: String;
  isCompleted: boolean;
  customClickEvent: () => void;
}

const BingoCell = ({
  content,
  isCompleted,
  customClickEvent,
}: BingoCellProp) => {
  return (
    <Grid
      item
      xs={4}
      onClick={customClickEvent}
      sx={{
        position: "relative",
        width: 120,
        "&::before": {
          display: "block",
          content: "''",
          paddingBottom: "100%",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: isCompleted ? "primary.dark" : "primary.light",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 5,
          left: 5,
          right: 5,
          bottom: 5,
          padding: 1,
        }}
      >
        <Typography align="center" variant="h3">
          {content}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default BingoCell;
