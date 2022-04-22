// mui
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useState } from "react";

const BingoCell = (goal: any) => {
  const [state, setState] = useState({
    content: goal.content,
    isCompleted: goal.isCompleted,
  });

  return (
    <Grid
      item
      xs={4}
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
          {state.content}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default BingoCell;
