import { Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import SurveyResultAndroid from "../../assets/images/survey/SurveyResultAndroid.png";
import SurveyResultClover from "../../assets/images/survey/SurveyResultClover.png";
import SurveyResultDoer from "../../assets/images/survey/SurveyResultDoer.png";
import SurveyResultGwichanism from "../../assets/images/survey/SurveyResultGwichanism.png";
import SurveyResultHorse from "../../assets/images/survey/SurveyResultHorse.png";
import SurveyResultWorries from "../../assets/images/survey/SurveyResultWorries.png";
import { SurveyButton } from "../../components/common/Button";
import SurveyResultShare from "./SurveyResultShare";

const results = [
  // 1. 경주마형
  {
    imgUrl: SurveyResultHorse,
    subtitle: "눈 앞의 당근을 향해 전력질주!",
    title: "경주마형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "단기적인 목표 달성에 강한 편이에요.",
          "분명한 목표가 있을 때 좋은 성과를 낼 수 있어요.",
          "보상심리가 있고 자극을 추구해요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "장기적인 목표도 세워 보면 좋겠어요.",
          "건강 습관을 만들고 유지해 보면 좋겠어요. ",
        ],
      },
      {
        header: "이런 목표에 도전해보세요!",
        texts: [
          "영양제 챙겨먹기.",
          "기상 후 스트레칭 하기.",
          "OTT 1시간 미만 보기.",
          "충동구매 하지 않기.",
        ],
      },
    ],
  },
  // 2. 즉흥형
  {
    imgUrl: SurveyResultDoer,
    subtitle: "계획 따윈 사치다!",
    title: "즉흥형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "상황에 맞춰 일을 처리해요.",
          "결론보다는 과정을 즐겨요.",
          "시간에 대한 접근 방식이 여유로워요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "꾸준히 달성할 수 있는 작은 목표를 만들고 실행해보세요.",
          "작은 건강 습관을 만들고 유지해보면 좋겠어요.",
        ],
      },
      {
        header: "이런 목표에 도전해보세요",
        texts: [
          "영양제 챙겨먹기",
          "기상 후 스트레칭 하기",
          "충동구매 하지 않기",
        ],
      },
    ],
  },
  // 3. 귀차니즘형
  {
    imgUrl: SurveyResultGwichanism,
    subtitle: "모든 게 귀찮아..",
    title: "귀차니즘형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "평화롭고 여유로운 마음을 갖고 있어요.",
          "스트레스에 강한 편이에요.",
          "작은 것에 연연하지 않아요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "목표를 세우고 달성해보는 연습을 하면 좋겠어요.",
          "작은 목표를 달성한 뒤 성취감을 한 번 느껴보세요!",
          "작은 건강 습관을 만들고 유지해보면 좋겠어요.",
        ],
      },
      {
        header: "이런 목표에 도전해보세요",
        texts: [
          "'랜덤 목표' 기능을 사용해 간단한 목표들을 한 번 받아보세요!",
          "기상 후 스트레칭 하기",
          "충동구매 하지 않기 \n  외 다양한 목표들을 클릭 한 번으로 만나보세요!",
        ],
      },
    ],
  },
  // 4. 지게꾼형
  {
    imgUrl: SurveyResultWorries,
    subtitle: "걱정이 너무 많아요!",
    title: "지게꾼형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "책임감이 강해요!",
          "상상력이 풍부하고 아이디어가 많은 편이에요.",
          "신중하며 자립심이 강해요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "고민만 하다 기회를 놓칠 수도 있어요. 때로는 과감하게 행동할 필요가 있어요!",
          "주위 사람들과 나 사진을 조금 더 믿어보는 것은 어떨까요?",
        ],
      },
      {
        header: "이런 목표에 도전해보세요",
        texts: [
          "'랜덤 목표' 기능을 사용해 간단한 목표들을 한 번 받아보세요!",
          "영양제 챙겨 먹기",
          "하루 30분 이상 공부하기\n  외에도 다양한 목표들이 준비되어 있습니다!",
        ],
      },
    ],
  },
  // 5. 안드로이드형
  {
    imgUrl: SurveyResultAndroid,
    subtitle: "계획은⋯ 실행한다⋯.",
    title: "안드로이드형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "계획은 지키라고 있는 것! 계획을 잘 세우고 잘 지켜요",
          "규칙적이고 바른 생활 습관을 갖고 있어요.",
          "'믿을만 한 사람'이란 평가를 많이 얻는 편이에요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "때로는 쉴 시간도 필요해요.",
          "번아웃에 조심하는 편이 좋겠어요.",
        ],
      },
      {
        header: "이런 목표에 도전해보세요",
        texts: [
          "'랜덤 목표' 기능을 사용해 간단한 목표들을 한 번 받아보세요!",
          "피드 기능을 통해 다른 사람들의 생활 방식을 구경해봐도 좋겠어요.",
        ],
      },
    ],
  },
  // 6. 세 잎 클로버형
  {
    imgUrl: SurveyResultClover,
    subtitle: "작고 소중한 행복을 찾아서.",
    title: "세 잎 클로버 형",
    contents: [
      {
        header: "내 장점은?",
        texts: [
          "작은 일에도 보람과 행복을 느끼는 편이에요.",
          "시원한 바람, 오후의 산책... 사소한 일상을 사랑해요.",
          "일상의 루틴을 지키려고 노력해요.",
        ],
      },
      {
        header: "보완할 수 있는 점은?",
        texts: [
          "지루해지기 쉬워요. 가끔은 일상에서 벗어나 새로운 발견을 해보는 건 어떨까요?",
          "행동력이 부족할 수 있어요. 가끔은 과감하게 새로운 목표에 도전해봐요!",
        ],
      },
      {
        header: "이런 목표에 도전해보세요",
        texts: [
          "하루 30분 공부하기 ",
          "하루 30분 이상 운동하기 ",
          "외국어 공부 하기",
        ],
      },
    ],
  },
];

const getResult = () => {
  const resultType = window.location.href.split("#")[1] || "";
  let resultNumber = 0;
  switch (resultType) {
    case "android":
      resultNumber = 4;
      break;
    case "worries":
      resultNumber = 3;
      break;
    case "horse":
      resultNumber = 0;
      break;
    case "clover":
      resultNumber = 5;
      break;
    case "doer":
      resultNumber = 1;
      break;
    case "quichanism":
      resultNumber = 2;
      break;
    default:
      resultNumber = 0;
  }
  return resultNumber;
};

const SurveyResult = () => {
  const navigate = useNavigate();
  const resultNumber = getResult();
  const result = results[resultNumber];
  const contents = result.contents;
  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <Stack
        direction="column"
        alignItems="center"
        mt={4}
        paddingX={1}
        sx={{ maxWidth: 500 }}
      >
        <Typography fontSize={40} fontFamily={"BMEULJIRO"} mb={3}>
          나의 유형은?
        </Typography>
        <img src={result.imgUrl} alt="img" width={300} height="auto" />
        <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={4}>
          {result.subtitle}
        </Typography>
        <Typography fontSize={40} fontFamily={"BMEULJIRO"} mt={2}>
          {result.title}
        </Typography>
        <Stack direction="column" alignItems="start">
          {contents.map(function (content: any, index: number) {
            const texts = content.texts;
            return (
              <Stack key={index}>
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  mt={5}
                  mb={1}
                  variant="h1"
                  fontFamily="Noto Sans KR"
                  key={content.header + 1}
                >
                  {content.header}
                </Typography>
                {texts.map(function (text: string) {
                  return (
                    <Typography fontFamily="Noto Sans KR" key={text}>
                      · {text}
                    </Typography>
                  );
                })}
              </Stack>
            );
          })}
        </Stack>
        <Stack sx={{ paddingY: 4 }}>
          <SurveyResultShare
            subtitle={result.subtitle}
            title={result.title}
            imgUrl={result.imgUrl}
          />
        </Stack>
        <SurveyButton
          onClick={() => {
            navigate("../../");
          }}
          sx={{ width: "100%", marginTop: 1, padding: 3 }}
        >
          '갓생살기'에서 재미있게 갓생 살아보기
        </SurveyButton>
        <SurveyButton
          onClick={() => {
            navigate("../");
          }}
          sx={{ width: "100%", marginTop: 5, padding: 3 }}
        >
          테스트 다시 하기
        </SurveyButton>
      </Stack>
    </Stack>
  );
};

export default SurveyResult;
