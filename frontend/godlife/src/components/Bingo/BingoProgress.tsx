import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import React from "react";

const BingoProgress = (props: LinearProgressProps & { value: number }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" mb={1}>
      <Box sx={{ width: "85%", mr: 1 }}>
        <LinearProgress
          color={props.value < 3 ? "secondary" : "primary"}
          variant="determinate"
          value={(props.value * 100) / 3}
        />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${
          3 - props.value
        }/3`}</Typography>
      </Box>
    </Stack>
  );
};

export default BingoProgress;
