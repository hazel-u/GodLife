// react
import EditIcon from "@mui/icons-material/Edit";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

// Local
import BingoCell from "./BingoCell";

interface BingoProps {
  title: String;
  size: Number;
  goals: Array<Object>;
  mode: String;
  date: Date;
  streak: Number;
  totalUses: Number;
  createdBy: String;
}

export const Bingo = ({
  title,
  size,
  goals,
  mode,
  date,
  streak,
  totalUses,
  createdBy,
}: BingoProps) => {
  const [state, setState] = useState({
    title: title,
    size: size,
    goals: goals,
    mode: mode,
    date: date,
    streak: streak,
    totalUses: totalUses,
    createdBy: createdBy,
  });

  const editTitle = () => {
    setState({ ...state, title: "아아아" });
  };

  const completeGoal = () => {
    setState({ ...state });
  };

  let inputValue = "";

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 800,
      }}
    >
      <Grid
        container
        sx={{ justifyContent: "space-between", bgcolor: "primary.dark" }}
      >
        <Grid item xs>
          <Typography variant="h3" onClick={() => editTitle()}>
            {state.title}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ justifyContent: "flex-end" }}>
          <Typography>
            <EditIcon />
          </Typography>
        </Grid>
        <TextField label="Standard" variant="standard" value={inputValue} />
      </Grid>

      <h2>
        {state.createdBy +
          "님 " +
          state.totalUses +
          "일째 갓생중✨ | " +
          state.streak +
          "일 연속 갓생중"}
      </h2>
      {/* 빙고 박스 */}
      <Grid
        container
        sx={{
          stretch: { height: "100%" },
          maxWidth: 750,
        }}
      >
        {goals.map(function (goal, index) {
          return BingoCell(goal);
        })}
      </Grid>
    </Box>
  );
};

export default Bingo;
