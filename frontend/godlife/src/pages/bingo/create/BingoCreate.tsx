import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../../components/common/Button";
import { selectGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import BingoConfirm from "./BingoConfirm";
import BingoCopy from "./BingoCopy";
import BingoCreateGoalList from "./BingoCreateGoalList";
import BingoTitle from "./BingoTitle";

const BingoCreate = () => {
  const selectedGoals = useAppSelector(selectGoal);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();
  const [goals, setGoals] = useState<any[]>([]);

  const getGoals = () => {
    axios
      .get("goal")
      .then((res) => {
        setGoals(res.data.goals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGoals();
  }, []);

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const startBingo = () => {
    const goalsCount = selectedGoals.length;
    const selectedGoalsSeqs: number[] = selectedGoals.map(
      (goal: { seq: number }) => goal.seq
    );

    if (goalsCount === 9) {
      createBingo(selectedGoalsSeqs);
    } else {
      const goalsSeqs: number[] = goals.map(
        (goal: { seq: number }) => goal.seq
      );

      const unselectedGoalsSeqs = goalsSeqs.filter((goal) => {
        return !selectedGoalsSeqs.includes(goal);
      });

      shuffle(unselectedGoalsSeqs);
      const randomGoalsSeqs = unselectedGoalsSeqs.slice(0, 9 - goalsCount);
      selectedGoalsSeqs.push(...randomGoalsSeqs);

      createBingo(selectedGoalsSeqs);
    }
  };

  const navigate = useNavigate();
  const createBingo = (goals: number[]) => {
    axios
      .post(
        "bingo",
        { goals: shuffle(goals), title },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          setSnackbar({
            open: true,
            message: "갓생이 시작되었습니다.",
            severity: "success",
          })
        );
        navigate(`/bingo/${res.data.code}`);
      })
      .catch(() =>
        dispatch(
          setSnackbar({
            open: true,
            message: "다시 시도해주세요.",
            severity: "error",
          })
        )
      );
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const confirmBingo = () => {
    if (!title) {
      dispatch(
        setSnackbar({
          open: true,
          message: "빙고의 제목을 입력해주세요.",
          severity: "warning",
        })
      );
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <>
      <BingoConfirm
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        startBingo={startBingo}
      />
      <BingoCopy open={open} setOpen={setOpen} title={title} />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "1000px", padding: "50px", margin: "0 auto" }}
      >
        <Stack
          direction={fullScreen ? "column" : "row"}
          justifyContent="center"
          sx={{ width: "100%" }}
          spacing={5}
        >
          <BingoTitle title={title} setTitle={setTitle} />
          <Box sx={{ textAlign: "center" }}>
            <OutlinedButton
              variant="outlined"
              onClick={confirmBingo}
              sx={{ width: "200px" }}
            >
              시작하기
            </OutlinedButton>
          </Box>
        </Stack>

        <BingoCreateGoalList />
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ padding: "20px", width: "100%" }}
        >
          <OutlinedButton
            variant="outlined"
            onClick={() => {
              if (title) {
                setOpen(true);
              } else {
                dispatch(
                  setSnackbar({
                    open: true,
                    message: "빙고의 제목을 먼저 입력해주세요.",
                    severity: "warning",
                  })
                );
              }
            }}
          >
            빙고 복사
          </OutlinedButton>
        </Stack>
      </Stack>
    </>
  );
};

export default BingoCreate;
