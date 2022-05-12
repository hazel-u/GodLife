import { Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";

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
  const like = () => {
    axios.put(`bingo/${seq}/like`).then(() => {
      setClickLike(true);
      getBingo();
    });
  };

  return (
    <Stack direction="row" alignItems="center">
      <TextButton disabled={clickLike} onClick={like}>
        {clickLike ? "칭찬완료" : "칭찬하기"}
      </TextButton>
      <Typography color="primary">{likeCnt}</Typography>
    </Stack>
  );
};

export default BingoDetailLike;
