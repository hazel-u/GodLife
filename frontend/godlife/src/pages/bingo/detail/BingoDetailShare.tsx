import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";

import React from "react";
import ReactGA from "react-ga4";

import { ReactComponent as Link } from "../../../assets/icon/link.svg";
import { ReactComponent as FacebookLogo } from "../../../assets/logo/Brand/facebook.svg";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import BingoDetailShareImage from "./BingoDetailShareImage";
import BingoDetailShareKakao from "./BingoDetailShareKakao";
import BingoDetailShareTwitter from "./BingoDetailShareTwitter";

const BingoDetailShare = () => {
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
            ReactGA.gtag("event", "share", {
              method: "link",
              content_type: "link",
              item_id: "link",
            });
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={Link}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <BingoDetailShareImage />
        <BingoDetailShareKakao />
        <BingoDetailShareTwitter />

        <IconButton
          onClick={() => {
            ReactGA.gtag("event", "share", {
              method: "facebook",
              content_type: "facebook",
              item_id: "facebook",
            });
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

export default BingoDetailShare;
