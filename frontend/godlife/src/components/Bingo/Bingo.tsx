import Grid from "@mui/material/Grid";
import axios from "axios";

import { useCallback, useEffect, useState } from "react";

import { setDialog } from "../../store/dialog";
import { useAppDispatch } from "../../store/hooks";
import BingoCell from "./BingoCell";
import BingoProgress from "./BingoProgress";

interface BingoProps {
  size: number;
  goals: Array<Object>;
  mode: String;
  startDate: number[];
  createdBy: String;
  godlife: boolean;
  getBingo?: () => void;
  id?: string;
}

export const Bingo = ({
  size,
  goals,
  mode,
  startDate,
  createdBy,
  getBingo,
  godlife,
  id,
}: BingoProps) => {
  const dispatch = useAppDispatch();
  const [bingoCounts, setBingoCounts] = useState(0);

  // 1. 빙고 수 세기.
  const countBingos = useCallback(() => {
    interface goal {
      [key: string]: any;
    }

    let bingoCounts = 0;
    let downBingo = true;
    let upBingo = true;

    for (let i = 0; i < size; i++) {
      // 1-1). 대각 빙고 확인
      const upCell: goal = goals[size * (i + 1) - i - 1];
      const downCell: goal = goals[size * i + i];

      upBingo &&= upCell.completed;
      downBingo &&= downCell.completed;

      // 2-1). 가로/세로 빙고 확인
      let rowBingo = true;
      let colBingo = true;

      for (let j = 0; j < size; j++) {
        const rowCell: goal = goals[i + j * size];
        const colCell: goal = goals[i * size + j];
        rowBingo &&= rowCell.completed;
        colBingo &&= colCell.completed;
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

    setBingoCounts(bingoCounts);

    axios
      .put(
        `bingo/${id}/godlife`,
        { complete: 3 <= bingoCounts },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        if (3 <= bingoCounts && !godlife) {
          dispatch(
            setDialog({
              open: true,
              title: "갓생 달성!",
              content: "세 빙고를 달성하셨습니다!",
            })
          );
        }
        // getBingo && getBingo();
      });
  }, [goals, size, id, dispatch, godlife]);

  useEffect(() => {
    countBingos();
  }, [countBingos]);

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
  };

  return (
    <>
      <BingoProgress value={Math.min(3, bingoCounts)} />
      {/* 빙고 박스 */}
      <Grid
        container
        sx={{
          stretch: { height: "100%" },
          maxWidth: 750,
          backgroundColor: "white",
        }}
        id="bingo"
      >
        {goals.map(function (goal: any) {
          return (
            <BingoCell
              customClickEvent={() => completeGoal(goal)}
              content={goal.content}
              isCompleted={goal.completed}
              key={goal.seq}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Bingo;
