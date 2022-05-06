import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import React from "react";
import { useLocation } from "react-router-dom";

const BingoProgress = (props: LinearProgressProps & { value: number }) => {
  const location = useLocation();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      margin={1}
    >
      <Box sx={{ flex: 1, mr: 1 }}>
        <LinearProgress
          color={props.value < 3 ? "secondary" : "primary"}
          variant="determinate"
          value={(props.value * 100) / 3}
        />
      </Box>
      {location.pathname.split("/")[1] !== "list" && (
        <Box>
          <Typography variant="body2" color="text.secondary">
            {props.value === 3
              ? "갓생 달성!"
              : `갓생까지 ${3 - props.value}줄!`}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default BingoProgress;
