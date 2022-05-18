import { Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { TextButton } from "../../../components/common/Button";

const BingoDetailLike = ({
  likeCnt,
  seq,
  getBingo,
}: {
  likeCnt: number;
  seq: string;
  getBingo: () => void;
}) => {
  const [clickLike, setClickLike] = useState(false);

  const location = useLocation();

  const like = () => {
    axios.put(`bingo/${seq}/like`).then(() => {
      setClickLike(true);

      if (location.pathname.split("/")[1] === "/bingo") {
        getBingo();
      }
    });
  };

  return (
    <Stack direction="row" alignItems="center">
      <TextButton disabled={clickLike} onClick={like}>
        {clickLike ? "칭찬완료" : "칭찬하기"}
      </TextButton>
      <Typography color="primary">
        {location.pathname.split("/")[1] !== "/bingo" && clickLike
          ? likeCnt + 1
          : likeCnt}
      </Typography>
    </Stack>
  );
};

export default BingoDetailLike;
