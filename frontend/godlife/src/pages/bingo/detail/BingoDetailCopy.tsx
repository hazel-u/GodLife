import React from "react";

import { TextButton } from "../../../components/common/Button";
import { setDialog } from "../../../store/dialog";
import { useAppDispatch } from "../../../store/hooks";

const BingoDetailCopy = ({ code }: { code: string }) => {
  const dispatch = useAppDispatch();
  const copyBingoCode = () => {
    navigator.clipboard.writeText(`${code}`);
    dispatch(
      setDialog({
        open: true,
        title: "갓생 코드 복사 완료!",
        content:
          "갓생 코드가 클립보드에 복사되었습니다. \n갓생 만들기에서 복사하기 버튼을 누르신 후 \n갓생 코드를 입력하시면 똑같이 생긴 갓생이 만들어집니다.",
      })
    );
  };

  return <TextButton onClick={copyBingoCode}>갓생 복사</TextButton>;
};

export default BingoDetailCopy;
