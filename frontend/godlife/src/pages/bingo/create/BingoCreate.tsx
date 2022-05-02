import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BorderImage from "../../../assets/images/border.webp";
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
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          border: "20px solid white",
          borderImageSource: `url(${BorderImage})`,
          borderImageSlice: "37 51 47 47",
          borderImageWidth: "13px 13px 14px 13px",
          borderImageOutset: "13px 13px 13px 11px",
          borderImageRepeat: "repeat repeat",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "772px",
            [theme.breakpoints.down(800)]: {
              width: "548px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "324px",
            },
          })}
        >
          <Typography fontSize={36} fontFamily="BMEULJIRO">
            갓생 만들기
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {`최대 9개의 목표를 선택해 오늘의 갓생을 만들어보세요. \n현재 ${selectedGoals.length}개의 목표를 선택하셨습니다.`}
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
              <BlackButton onClick={confirmBingo} sx={{ width: "100px" }}>
                시작하기
              </BlackButton>

              <OutlinedButton
                variant="outlined"
                sx={{ width: "100px" }}
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
            </Stack>
          </Stack>
        </Box>

        <BingoCreateGoalList />
      </Stack>
    </>
  );
};

export default BingoCreate;
