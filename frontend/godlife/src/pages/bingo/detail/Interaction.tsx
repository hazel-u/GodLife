import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

import { useState } from "react";

import { TextButton } from "../../../components/common/Button";
import { setDialog } from "../../../store/dialog";
import { useAppDispatch } from "../../../store/hooks";

interface InteractionProps {
  code: number;
  likeCnt: number;
  seq: string;
  getBingo: () => void;
}

const Interaction = ({ code, likeCnt, seq, getBingo }: InteractionProps) => {
  const dispatch = useAppDispatch();
  const copyBingoCode = () => {
    navigator.clipboard.writeText(`${code}`);
    dispatch(
      setDialog({
        open: true,
        title: "빙고 코드 복사 완료!",
        content:
          "빙고 코드가 클립보드에 복사되었습니다. 빙고 만들기에서 코드를 입력해 똑같은 빙고를 만들 수 있습니다.",
      })
    );
  };

  const [clickLike, setClickLike] = useState(false);
  const like = () => {
    axios.put(`bingo/${seq}/like`).then(() => {
      setClickLike(true);
      getBingo();
    });
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ maxWidth: "500px", width: "100%" }}
    >
      <Stack direction="row" alignItems="center">
        <Box>
          <IconButton disabled={clickLike} size="small" onClick={like}>
            👍
          </IconButton>
        </Box>
        <Typography sx={{ mt: 0.5 }}>{likeCnt}</Typography>
      </Stack>
      <TextButton onClick={copyBingoCode}>빙고 복사</TextButton>
    </Stack>
  );
};

export default Interaction;
