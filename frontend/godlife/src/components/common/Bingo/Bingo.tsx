import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import { OutlinedInput } from "../Input";
import BingoCell from "./BingoCell";

interface BingoProps {
  title: String;
  size: number;
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
    bingoCounts: 0,
  });
  useEffect(() => {
    countBingos();
  });

  // 1. 빙고 수 세기.
  const countBingos = () => {
    interface goal {
      [key: string]: any;
    }

    const size = state.size;

    let bingoCounts = 0;
    let downBingo = true;
    let upBingo = true;

    for (let i = 0; i < size; i++) {
      // 1-1). 대각 빙고 확인
      const upCell: goal = state.goals[size * (i + 1) - i - 1];
      const downCell: goal = state.goals[size * i + i];

      upBingo &&= upCell.isCompleted;
      downBingo &&= downCell.isCompleted;

      // 2-1). 가로/세로 빙고 확인
      let rowBingo = true;
      let colBingo = true;

      for (let j = 0; j < size; j++) {
        const rowCell: goal = state.goals[i + j * size];
        const colCell: goal = state.goals[i * size + j];
        rowBingo &&= rowCell.isCompleted;
        colBingo &&= colCell.isCompleted;
      }
      // 2-2). 가로 / 세로 빙고 합산
      for (let bingo of [rowBingo, colBingo]) {
        bingoCounts = bingo ? bingoCounts + 1 : bingoCounts;
      }
    }
    // 1-2). 대각 빙고 합산
    for (let bingo of [upBingo, downBingo]) {
      bingoCounts = bingo ? bingoCounts + 1 : bingoCounts;
    }
    // 빙고 수 갱신
    if (state.bingoCounts !== bingoCounts) {
      setState({ ...state, bingoCounts: bingoCounts });
    }
  };

  const editTitle = () => {
    setState({ ...state, title: "아아아" });
  };

  const completeGoal = (index: number) => {
    let updatedGoals = state.goals.slice();

    const updatedGoal: any = state.goals[index];
    updatedGoal.isCompleted = !updatedGoal.isCompleted;
    updatedGoals[index] = updatedGoal;

    setState({ ...state, goals: updatedGoals });
    countBingos();
  };

  const computeTimeLeft = () => {};

  let inputValue = "";
  // countBingos();
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
      </Grid>

      <h2>
        {state.createdBy +
          "님 " +
          state.totalUses +
          "일째 갓생중✨ | " +
          state.streak +
          "일 연속 갓생중💨 |" +
          state.bingoCounts +
          "빙고"}
      </h2>
      {/* 빙고 박스 */}
      <Grid
        container
        sx={{
          stretch: { height: "100%" },
          maxWidth: 750,
        }}
      >
        {goals.map(function (goal: any, index: number) {
          return (
            <BingoCell
              customClickEvent={() => completeGoal(index)}
              content={goal.content}
              isCompleted={goal.isCompleted}
              key={index}
            ></BingoCell>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Bingo;
