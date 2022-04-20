// react
import { useState } from "react";
// 3rd party
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Icon } from "@mui/material";
// Local
import BingoCell from "./BingoCell";

type BingoProps = {
  title: String;
  size: Number;
  goals: Array<Object>;
  mode: String;
  date: Date;
  streak: Number;
  totalUses: Number;
  createdBy: String;
};
// 1. Size: 한 변의 길이.
// 2. goals: 배열.
// 3. isActive: 빙고 작동 여부

export const Bingo = ({
  title,
  size,
  goals,
  mode,
  date,
  streak,
  totalUses,
  createdBy,
}: BingoProps) => {
  const [state, setState] = useState({
    title: title,
    size: size,
    goals: goals,
    mode: mode,
    date: date,
    streak: streak,
    totalUses: totalUses,
    createdBy: createdBy,
  });

  const editTitle = () => {
    setState({ ...state, title: "아아아" });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 800,
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
        }}
      >
        <h1 onClick={() => editTitle()}> {state.title} </h1>
        <Icon>star</Icon>
      </Box>

      <h2>
        {state.createdBy +
          "님 " +
          state.totalUses +
          "일째 갓생중✨ | " +
          state.streak +
          "일 연속 갓생중"}
      </h2>
      {/* 빙고 박스 */}
      <Grid
        container
        sx={{
          stretch: { height: "100%" },
          maxWidth: 750,
        }}
      >
        {goals.map(function (goal, index) {
          return BingoCell(goal);
        })}
      </Grid>
    </Box>
  );
};

export default Bingo;
