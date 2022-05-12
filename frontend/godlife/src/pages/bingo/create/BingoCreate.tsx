import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BlackButton, OutlinedButton } from "../../../components/common/Button";
import { selectGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { setTodayBingo } from "../../../store/todayBingo";
import axiosWithToken from "../../../utils/axios";
import BingoCopy from "./BingoCopy";
import BingoCreateConfirm from "./BingoCreateConfirm";
import BingoCreateGoalList from "./BingoCreateGoalList";
import BingoCreateTitle from "./BingoCreateTitle";

const BingoCreate = () => {
  useEffect(() => {
    document.title = "오늘의 갓생 만들기 | 갓생살기";
    return () => {
      document.title = "갓생살기";
    };
  }, []);

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
    axiosWithToken
      .post("bingo", { goals: shuffle(goals), title })
      .then((res) => {
        dispatch(
          setSnackbar({
            open: true,
            message: "갓생이 시작되었습니다.",
            severity: "success",
          })
        );
        navigate(`/bingo/${res.data.code}`);
        dispatch(setTodayBingo(res.data.code));
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
  const fullScreen = useMediaQuery(theme.breakpoints.down(650));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const confirmBingo = () => {
    if (!title) {
      dispatch(
        setSnackbar({
          open: true,
          message: "갓생의 제목을 입력해주세요.",
          severity: "warning",
        })
      );
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <>
      <BingoCreateConfirm
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        startBingo={startBingo}
      />
      <BingoCopy open={open} setOpen={setOpen} title={title} />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
          padding: "60px 0",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "772px",
            [theme.breakpoints.down(900)]: {
              width: "548px",
            },
            [theme.breakpoints.down(650)]: {
              width: "324px",
            },
            textAlign: "center",
          })}
        >
          <Typography fontSize={24} fontFamily="BMEULJIRO" variant="h1">
            오늘의 갓생 만들기
          </Typography>
          <Typography>
            최대 9개의 목표를 선택해 오늘의 갓생을 만드시오.
            <br />
            {selectedGoals.length}개 목표 선택 | {9 - selectedGoals.length}개
            무작위 목표
          </Typography>

          <Stack
            direction={fullScreen ? "column" : "row"}
            justifyContent="center"
            sx={{ width: "100%", maxWidth: "772px" }}
            spacing={5}
            marginY={5}
          >
            <BingoCreateTitle title={title} setTitle={setTitle} />

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ textAlign: "center" }}
            >
              <OutlinedButton
                variant="outlined"
                sx={{ width: "150px" }}
                onClick={() => {
                  if (title) {
                    setOpen(true);
                  } else {
                    dispatch(
                      setSnackbar({
                        open: true,
                        message: "갓생의 제목을 먼저 입력해주세요.",
                        severity: "warning",
                      })
                    );
                  }
                }}
              >
                갓생 복사
              </OutlinedButton>
              <BlackButton onClick={confirmBingo} sx={{ width: "150px" }}>
                시작하기
              </BlackButton>
            </Stack>
          </Stack>
        </Box>

        <BingoCreateGoalList />
      </Stack>
    </>
  );
};

export default BingoCreate;
