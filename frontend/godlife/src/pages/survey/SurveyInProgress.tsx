import { Box, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SurveyButton } from "../../components/common/Button";
import axiosWithToken from "../../utils/axios";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; totalquestions: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${
          props.value / 10
        }/${props.totalquestions}`}</Typography>
      </Box>
    </Box>
  );
}

const changePersonalityType = (personality: string) => {
  let type = "";
  switch (personality) {
    case "android":
      type = "안드로이드형";
      break;
    case "worries":
      type = "지게꾼형";
      break;
    case "clover":
      type = "세잎클로버형";
      break;
    case "gwichanism":
      type = "귀차니즘형";
      break;
    case "doer":
      type = "즉흥형";
      break;
    default:
      type = "경주마형";
  }
  axiosWithToken.post("personality", {
    type: type,
  });
};

// 타입 6개
// 1. 즉흥형  -> 외향성 /  우호성 / 개방성
// 2. 귀차니즘형 ->
// 3. 지게꾼형 -> 신경성
// 4. 안드로이드형
// 5. 세 잎 클로버형
// 6. 경주마형

// 빅5 파라미터
// 1. 신경성 N
// 2. 외향성 E
// 3. 개방성 O
// 3. 우호성 A
// 4. 성실성 C

const questions = [
  {
    question: "아침에 일어나면 나는?",
    answers: [
      {
        text: "또 지각이야! 알람을 끄고 부랴부랴 집에서 나설 준비를 한다.",
        type: "N",
      },
      {
        text: "오늘은 아침에 운동하는 날이었지! 이불부터 개고 계획에 맞춰 하루를 시작한다.",
        type: "AC",
      },
    ],
  },
  {
    question: "회사에 도착했다. 이 때 나는?",
    answers: [
      {
        text: "책상도 정리 하고 커피도 타오고... 어제 아이돌 공연 영상 떴나 SNS 한 번 볼까?",
        type: "EO",
      },
      {
        text: "어제는 이만큼 했었지! 어제에 이어서 할 일을 시작한다.",
        type: "CA",
      },
    ],
  },
  {
    question:
      "간단히 외출 할 일이 생겼다! 걸어서 20분이면 갈 수 있을 만 한 거리다. 이 때 나는..",
    answers: [
      { text: "3보 이상 택시! 택시를 잡아 타고 flex한다.", type: "E" },
      {
        text: "운동도 할 겸 걸어가볼까? 좀 멀더라도 산책 삼아 걸어간다.",
        type: "CA",
      },
    ],
  },
  {
    question: "드디어 신나는 점심시간이다! 오늘의 메뉴는?",
    answers: [
      {
        text: "맵고 짜고 기름진 것!!! 점심이지만 껍데기집에서 김치찌개 한 사발 갈까요?",
        type: "OA",
      },
      {
        text: "골고루 먹는게 좋겠지? 샐러드와 닭가슴살을 잘 챙겨먹는다.",
        type: "C",
      },
    ],
  },
  {
    question:
      "점심시간에 인터넷 쇼핑을 하다 보니 마음에 쏙 드는 옷을 발견했다! 어쩐다??",
    answers: [
      {
        text: "인기 좋을 것 같은 요 아이! 다른 이들이 채가기 전에 바로 지른다!",
        type: "EO",
      },
      {
        text: "아냐.. 비슷하게 생긴 옷 옷장에 5벌 있어. 참는다.",
        type: "C",
      },
    ],
  },
  {
    question: "으어어 졸려... 점심엔 아메리카노 한 사발 해야지! 카페에 간 나는",
    answers: [
      {
        text: "준비해온 텀블러에 커피를 담아온다. 500원 할인은 보너스!",
        type: "CE",
      },
      { text: "편한게 최고! 일회용 컵에 커피를 가져온다. ", type: "" },
    ],
  },
  {
    question:
      "아직 해야 할 일이 많은데 놀고 싶은 마음이 솟구친다. 그럴 때 나는",
    answers: [
      {
        text: '"뒤는 맡긴다. 미래의 나"\n 우선 놀고 나서 마무리한다. ',
        type: "E",
      },
      {
        text: '"놀땐 놀더라도 할 건 하고 놀아야지..."얼른 할 일을 마무리하고 놀러 간다. ',
        type: "C",
      },
    ],
  },
  {
    question: "오늘의 일은 유달리 힘들었던 것 같다. 퇴근한 나는... ",
    answers: [
      {
        text: "난 여기까지야... 침대에 드러눕는다.",
        type: "N",
      },
      { text: "오늘도 고생했어! 딱 30분만 공부하고 쉴까?", type: "AC" },
    ],
  },
  {
    question:
      "자기 전에 잠깐 유튜브를 틀었다. 최애 유튜버가 라면과 족발을 양껏 먹고 있다 .이 때 나는...",
    answers: [
      {
        text: "이 때를 위해 준비했다! 아껴뒀던 쿠폰을 모아 야식을 시킨다. ",
        type: "O",
      },
      {
        text: "좀 있다 잘건데 뭐 먹으면 안 되겠지? 아쉽지만 내일 점심에 먹기로 기약한다. ",
        type: "C",
      },
    ],
  },
  {
    question:
      " 정신없이 유튜브를 보다보니 어느새 새벽이 되어버렸다. 아직 못 씻은 나는...",
    answers: [
      {
        text: "너무 피곤하다. 내일 아침에 씻을래.... ",
        type: "N",
      },
      {
        text: "아무리 피곤해도 안 씻고 잘 수는 없다. 화장실로 직행!",
        type: "C",
      },
    ],
  },
];
const chooseType = (big5Type: any) => {
  let answer = "";
  if (big5Type.C > 5) {
    answer = "android";
  } else if (big5Type.C > 4) {
    if (big5Type.A > 3) {
      answer = "horse";
    } else if (big5Type.N > 2) {
      answer = "worries";
    } else if (big5Type.O > 1) {
      answer = "clover";
    }
    answer = "android";
  } else if (big5Type.C > 2) {
    if (big5Type.A > 3) {
      answer = "doer";
    } else if (big5Type.O > 1) {
      answer = "horse";
    }
    answer = "clover";
  } else {
    answer = "gwichanism";
  }
  return answer;
};

const SurveyInProgress = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [lifeType] = useState({ N: 0, E: 0, O: 0, A: 0, C: 0 });
  const clickNext = (big5Type: string) => {
    if (page + 1 < questions.length) {
      setPage(page + 1);

      if (big5Type) {
        for (let syl of big5Type) {
          switch (syl) {
            case "N":
              lifeType.N++;
              break;
            case "E":
              lifeType.E++;
              break;
            case "O":
              lifeType.O++;
              break;
            case "A":
              lifeType.A++;
              break;
            case "C":
              lifeType.C++;
              break;
          }
        }
      }
    } else {
      const lifeTypeResult = chooseType(lifeType);

      const isAuth = localStorage.getItem("token");
      if (isAuth) {
        changePersonalityType(lifeTypeResult);
      }
      navigate(`../../survey/result#${lifeTypeResult}`);
    }
  };

  return (
    <Stack direction="column" justifySelf="center" alignItems="center">
      <Stack
        direction="column"
        alignItems="center"
        justifySelf={"center"}
        mt={4}
        sx={{ maxWidth: 500 }}
      >
        <Box sx={{ width: "90%" }}>
          <LinearProgressWithLabel
            value={(page + 1) * 10}
            totalquestions={questions.length}
          />
        </Box>
        <Typography
          fontSize={50}
          fontFamily={"BMEULJIRO"}
          mt={2}
          sx={{ maxWidth: 400, textOverflow: "ellipsis" }}
        >
          Q.{page + 1}
        </Typography>
        <Typography
          fontSize={25}
          fontFamily={"BMEULJIRO"}
          mt={2}
          sx={{
            wordBreak: "keep-all",
            textAlign: "center",
            maxWidth: 400,
            minHeight: 150,
          }}
        >
          {questions[page].question}
        </Typography>
        <Typography
          fontSize={15}
          fontFamily={"BMEULJIRO"}
          mt={2}
          mb={2}
        ></Typography>
        <SurveyButton
          onClick={() => clickNext(questions[page].answers[0].type)}
          sx={{
            width: "100%",
            marginTop: 5,
            paddingY: 2,
            paddingX: 2,
            minHeight: 100,
          }}
        >
          {questions[page].answers[0].text}
        </SurveyButton>
        <SurveyButton
          onClick={() => clickNext(questions[page].answers[1].type)}
          sx={{
            width: "100%",
            marginTop: 5,
            paddingY: 2,
            paddingX: 2,
            minHeight: 100,
          }}
        >
          {questions[page].answers[1].text}
        </SurveyButton>
      </Stack>
    </Stack>
  );
};

export default SurveyInProgress;
