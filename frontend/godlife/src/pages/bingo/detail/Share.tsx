import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import { IconButton, Stack } from "@mui/material";
import domtoimage from "dom-to-image";

import React from "react";

import FacebookLogo from "../../../assets/logo/Brand/facebook.png";
import TwitterLogo from "../../../assets/logo/Brand/twitter.png";
import KakaoShare from "./KakaoShare";

const Share = ({
  likeCnt,
  commentCnt,
}: {
  likeCnt: number;
  commentCnt: number;
}) => {
  const today = new Date();
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const text = `${month}월 ${date}일의 갓생`;

  const saveImage = () => {
    const bingo = document.getElementById("bingo");

    if (bingo) {
      domtoimage.toPng(bingo).then(function (dataUrl: string) {
        const link = document.createElement("a");
        link.download = `${month}월_${date}일의_갓생.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Stack direction="column" alignItems="center">
      <p>공유하기</p>
      <p>아이콘 수정 예정</p>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
          sx={{ backgroundColor: "#cacaca" }}
        >
          <LinkIcon />
        </IconButton>

        <IconButton onClick={saveImage} sx={{ backgroundColor: "#cacaca" }}>
          <ImageIcon />
        </IconButton>

        <KakaoShare likeCount={likeCnt} commentCount={commentCnt} />

        <IconButton
          onClick={() => {
            window.open(
              `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <img src={TwitterLogo} alt="Twitter Logo" style={{ width: "40px" }} />
        </IconButton>

        <IconButton
          onClick={() => {
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <img
            src={FacebookLogo}
            alt="Facebook Logo"
            style={{ width: "40px" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Share;
