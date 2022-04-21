import React from "react";
import { Button, Stack } from "@mui/material";
import KakaoShare from "./KakaoShare";

const Share = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const text = `${month}월 ${date}일의 갓생살기`;

  return (
    <Stack direction="column" alignItems="center">
      <p>공유하기</p>
      <Stack direction="row">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          링크
        </Button>

        <KakaoShare likeCount={10} commentCount={20} />

        <Button
          onClick={() => {
            window.open(
              `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
            );
          }}
        >
          트위터
        </Button>

        <Button
          onClick={() => {
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
        >
          페이스북
        </Button>
      </Stack>
    </Stack>
  );
};

export default Share;
