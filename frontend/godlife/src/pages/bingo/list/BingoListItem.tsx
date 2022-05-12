import { Box, Typography } from "@mui/material";

import React from "react";

import Bingo from "../../../components/Bingo/Bingo";
import { BingoType } from "../../../types/bingo";

const BingoListItem = ({ bingo }: { bingo: BingoType }) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
        padding: "20px 30px",
        textAlign: "center",
      }}
    >
      <Typography fontSize={12}>
        {bingo.startDate[0]}년 {bingo.startDate[1]}월 {bingo.startDate[2]}일
      </Typography>
      <Typography textAlign={"center"} fontFamily={"BMEULJIRO"} fontSize={20}>
        {bingo.title}
      </Typography>
      <Bingo
        createdBy={bingo.userName}
        size={3}
        goals={bingo.goals}
        mode={"Active"}
        startDate={bingo.startDate}
        godlife={bingo.godlife}
      />
    </Box>
  );
};

export default BingoListItem;
