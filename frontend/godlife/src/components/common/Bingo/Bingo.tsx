import Grid from "@mui/material/Grid";
import axios from "axios";

import { useEffect, useState } from "react";

import BingoCell from "./BingoCell";

interface BingoProps {
  size: number;
  goals: Array<Object>;
  mode: String;
  startDate: Date;
  createdBy: String;
  getBingo?: () => void;
}

export const Bingo = ({
  size,
  goals,
  mode,
  startDate,
  createdBy,
  getBingo,
}: BingoProps) => {
  const [state, setState] = useState({
    size: size,
    goals: goals,
    mode: mode,
    startDate: startDate,
    bingoCounts: 0,
  });
  useEffect(() => {
    countBingos();
  }, []);

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
    console.log(bingoCounts);
  };

  // 2.
  const completeGoal = (goal: {
    category: string;
    completed: boolean;
    content: string;
    seq: string;
  }) => {
    axios
      .post(
        "goal",
        {
          completed: !goal.completed,
          seq: goal.seq,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        if (getBingo) {
          getBingo();
        }
      })
      .catch((err) => console.log(err));
    countBingos();
  };

  return (
    <>
      {/* 빙고 박스 */}
      <Grid
        container
        sx={{
          stretch: { height: "100%" },
          maxWidth: 750,
        }}
        id="bingo"
      >
        {goals.map(function (goal: any, index: number) {
          return (
            <BingoCell
              customClickEvent={() => completeGoal(goal)}
              content={goal.content}
              isCompleted={goal.completed}
              key={index}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Bingo;
