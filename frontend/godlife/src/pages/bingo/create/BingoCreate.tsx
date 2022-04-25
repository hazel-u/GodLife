import { Box, Stack } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../../components/common/Button";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import BingoCopy from "./BingoCopy";
import BingoCreateComponents from "./BingoCreateComponents";

interface Goal {
  seq: number;
  content: string;
  category: string;
}

const BingoCreate = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("임시 제목");
  const dispatch = useAppDispatch();
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([
    {
      seq: 41,
      content: "대중교통 이용하기",
      category: "환경",
    },
    {
      seq: 1,
      content: "물 1.5L 이상 마시기",
      category: "건강한삶",
    },
    {
      seq: 2,
      content: "영양제 챙겨먹기",
      category: "건강한삶",
    },
    {
      seq: 3,
      content: "운동 30분 이상 하기",
      category: "건강한삶",
    },
    {
      seq: 4,
      content: "8000 걸음 이상 걷기",
      category: "건강한삶",
    },
    {
      seq: 5,
      content: "한 시간마다 스트레칭",
      category: "건강한삶",
    },
    {
      seq: 6,
      content: "잠들기 4시간 이전에 먹지 않기",
      category: "건강한삶",
    },
    {
      seq: 7,
      content: "밥 먹고 눕지 않기 ",
      category: "건강한삶",
    },
    {
      seq: 8,
      content: "수면 이외에 눕지 않기",
      category: "건강한삶",
    },
  ]);
  const [goals, setGoals] = useState<Goal[]>([
    {
      seq: 1,
      content: "물 1.5L 이상 마시기",
      category: "건강한삶",
    },
    {
      seq: 2,
      content: "영양제 챙겨먹기",
      category: "건강한삶",
    },
    {
      seq: 3,
      content: "운동 30분 이상 하기",
      category: "건강한삶",
    },
    {
      seq: 4,
      content: "8000 걸음 이상 걷기",
      category: "건강한삶",
    },
    {
      seq: 5,
      content: "한 시간마다 스트레칭",
      category: "건강한삶",
    },
    {
      seq: 6,
      content: "잠들기 4시간 이전에 먹지 않기",
      category: "건강한삶",
    },
    {
      seq: 7,
      content: "밥 먹고 눕지 않기 ",
      category: "건강한삶",
    },
    {
      seq: 8,
      content: "수면 이외에 눕지 않기",
      category: "건강한삶",
    },
    {
      seq: 36,
      content: "텀블러 들고다니기",
      category: "환경",
    },
    {
      seq: 37,
      content: "일회용품 사용하지 않기",
      category: "환경",
    },
    {
      seq: 38,
      content: "쓰레기 분리수거 해서 버리기",
      category: "환경",
    },
    {
      seq: 39,
      content: "계단 이용하기",
      category: "환경",
    },
    {
      seq: 40,
      content: "음식 포장 이용하기",
      category: "환경",
    },
    {
      seq: 41,
      content: "대중교통 이용하기",
      category: "환경",
    },
  ]);

  const startBingo = () => {
    const selectedGoalsSeqs: number[] = selectedGoals.map(
      (goal: { seq: number }) => goal.seq
    );

    if (selectedGoals.length === 9) {
      createBingo(selectedGoalsSeqs);
    } else {
      const goalsSeqs: number[] = goals.map(
        (goal: { seq: number }) => goal.seq
      );

      const unselectedGoals = goalsSeqs.filter((goal) => {
        return !selectedGoalsSeqs.includes(goal);
      });
      createBingo(unselectedGoals);
    }
  };

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const navigate = useNavigate();
  const createBingo = (goals: number[]) => {
    console.log(shuffle(goals));
    axios
      .post(
        "bingo",
        { goals, title },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => navigate(`/bingo/${res.data.code}`))
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

  return (
    <>
      <BingoCopy open={open} setOpen={setOpen} title={title} />
      <Stack direction="column" alignItems="center">
        <BingoCreateComponents />
        <Box sx={{ textAlign: "center", padding: "20px" }}>
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
          <OutlinedButton variant="outlined" onClick={startBingo}>
            시작하기
          </OutlinedButton>
        </Box>
      </Stack>
    </>
  );
};

export default BingoCreate;
