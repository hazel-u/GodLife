import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";

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
      <Box>
        <IconButton disabled={clickLike} size="small" onClick={like}>
          <ThumbUpIcon style={{ color: "#BB9B72" }} />
        </IconButton>
      </Box>
      <Typography sx={{ mt: 0.5 }}>{likeCnt}</Typography>
    </Stack>
  );
};

export default BingoDetailLike;
