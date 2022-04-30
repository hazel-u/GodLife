import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import * as htmlToImage from "html-to-image";

import React from "react";

import { ReactComponent as Image } from "../../../assets/icon/image.svg";
import { ReactComponent as Link } from "../../../assets/icon/link.svg";
import { ReactComponent as FacebookLogo } from "../../../assets/logo/Brand/facebook.svg";
import { ReactComponent as TwitterLogo } from "../../../assets/logo/Brand/twitter.svg";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import KakaoShare from "./KakaoShare";

const Share = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const text = `${month}월 ${date}일의 갓생`;

  const saveImage = () => {
    const bingo = document.getElementById("bingo");

    if (bingo) {
      htmlToImage.toPng(bingo).then(function (dataUrl: string) {
        const link = window.document.createElement("a");
        link.download = `${month}월_${date}일의_갓생.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const dispatch = useAppDispatch();

  return (
    <Stack direction="column" alignItems="center" sx={{ margin: "8% 0" }}>
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mb={1}>
        함께 갓생 살기
      </Typography>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            dispatch(
              setSnackbar({
                open: true,
                message: "갓생 링크가 클립보드에 복사되었습니다.",
                severity: "success",
              })
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={Link}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <IconButton onClick={saveImage} sx={{ padding: 0, height: "40px" }}>
          <SvgIcon
            component={Image}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <KakaoShare />

        <IconButton
          onClick={() => {
            window.open(
              `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={TwitterLogo}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <IconButton
          onClick={() => {
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={FacebookLogo}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Share;
