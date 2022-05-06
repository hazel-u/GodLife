import { IconButton, SvgIcon } from "@mui/material";

import ReactGA from "react-ga4";

import { ReactComponent as TwitterLogo } from "../../../assets/logo/Brand/twitter.svg";
import { selectBingo } from "../../../store/bingo";
import { useAppSelector } from "../../../store/hooks";

interface goal {
  [key: string]: any;
}
// 1. 빙고 수 세기.
const countBingos = (goals: goal[]) => {
  const size = 3;
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
  return bingoCounts;
};

const emojifyBingo = (goals: goal[]) => {
  const size = 3;
  let emojifiedBingo = "";
  for (let i = 0; i < goals.length; i++) {
    if (i !== 0 && i % size === 0) {
      emojifiedBingo += "%0A";
    }
    emojifiedBingo = goals[i].completed
      ? emojifiedBingo + "🟩"
      : emojifiedBingo + "⬛";
  }
  return "%0A" + emojifiedBingo.trim();
};

const BingoDetailShareTwitter = () => {
  const { startDate, goals, godCount, serialGodCount } =
    useAppSelector(selectBingo);
  const numberEmoji = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
  const bingoLines = countBingos(goals);
  const emojifiedBingo = emojifyBingo(goals);

  let text = `✨${startDate[1]}월 ${startDate[2]}일의 갓생✨%0A
  🎉 갓생 ${numberEmoji[bingoLines]}빙고 달성%0A
  ${emojifiedBingo}%0A
  `;
  text = serialGodCount
    ? text + `%0A🏃‍♀️ 연속 ${serialGodCount} 일 갓생 달성!!%0A`
    : text + `%0A🏃‍♀️ 연속 1 일 갓생 달성 도전중!!%0A`;
  text = godCount
    ? text + `🔥 총 ${godCount} 일 갓생 달성!!%0A`
    : text + `🔥 첫 갓생 달성 도전중!!%0A`;

  return (
    <IconButton
      onClick={() => {
        ReactGA.gtag("event", "share", {
          method: "twitter",
          content_type: "twitter",
          item_id: "twitter",
        });
        window.open(
          `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
        );
      }}
      sx={{ padding: 0, height: "40px" }}
    >
      <SvgIcon
        component={TwitterLogo}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

export default BingoDetailShareTwitter;
