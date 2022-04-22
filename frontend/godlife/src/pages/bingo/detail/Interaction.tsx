import { IconButton, Stack } from "@mui/material";
import axios from "axios";

import { TextButton } from "../../../components/common/Button";
import { setDialog } from "../../../store/dialog";
import { useAppDispatch } from "../../../store/hooks";

interface InteractionProps {
  code: number;
  likeCnt: number;
  seq: string;
}

const Interaction = ({ code, likeCnt, seq }: InteractionProps) => {
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

  const like = () => {
    axios.put(`bingo/${seq}/like`);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: "500px" }}
    >
      <Stack direction="row" alignItems="center">
        <IconButton size="small" onClick={like}>
          👍
        </IconButton>
        <span>{likeCnt}</span>
      </Stack>
      <TextButton onClick={copyBingoCode}>빙고 복사</TextButton>
    </Stack>
  );
};

export default Interaction;
