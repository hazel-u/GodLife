import { Box, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BlackButton } from "../../components/common/Button";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const questions = [
  {
    question: "질문입니다1 ",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
  {
    question: "질문입니다2 ",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
  {
    question: "질문입니다3",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
  {
    question: "질문입니다4",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
  {
    question: "질문입니다5",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
  {
    question: "질문입니다6",
    answers: [
      { text: "집에 가고 싶다", type: "집순이" },
      { text: "퇴근하고싶다", type: "집순이" },
    ],
  },
];

const SurveyInProgress = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const clickNext = () => {
    if (page + 1 < questions.length) {
      setPage(page + 1);
    } else {
      navigate(`result`);
    }
  };

  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <Typography fontSize={40} fontFamily={"BMEULJIRO"} mt={2}>
        Q.{page + 1}
      </Typography>
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={2}>
        {questions[page].question}
      </Typography>
      <Typography
        fontSize={15}
        fontFamily={"BMEULJIRO"}
        mt={2}
        mb={2}
      ></Typography>
      <BlackButton onClick={clickNext} sx={{ width: "100%", marginTop: 5 }}>
        {questions[page].answers[0].text}
      </BlackButton>
      <BlackButton onClick={clickNext} sx={{ width: "100%", marginTop: 5 }}>
        {questions[page].answers[1].text}
      </BlackButton>
    </Stack>
  );
};

export default SurveyInProgress;
