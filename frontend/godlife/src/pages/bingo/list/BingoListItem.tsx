import { Box, Typography } from "@mui/material";

import React from "react";

import BorderImage from "../../../assets/images/border.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { BingoType } from "../../../types/bingo";

const BingoListItem = ({ bingo }: { bingo: BingoType }) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "white",
        border: "20px solid white",
        borderImageSource: `url(${BorderImage})`,
        borderImageSlice: "37 51 47 47",
        borderImageWidth: "14px 20px 14px 13px",
        borderImageOutset: "13px 13px 13px 11px",
        borderImageRepeat: "repeat repeat",
      }}
    >
      <Typography fontSize={12}>
        {bingo.startDate[0]}년 {bingo.startDate[1]}월 {bingo.startDate[2]}일의
        갓생
      </Typography>
      <Typography
        textAlign={"center"}
        fontFamily={"BMEULJIRO"}
        fontSize={16}
        marginY={1}
      >
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
