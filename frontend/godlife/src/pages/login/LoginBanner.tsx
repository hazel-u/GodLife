import { Divider, Stack, Typography } from "@mui/material";

import React from "react";

import BorderImage from "../../assets/images/border.webp";
import Stamp from "../../assets/images/stamp.webp";

const LoginBanner = () => {
  return (
    <Stack
      sx={{
        height: "80vh",
        margin: "20px",
        backgroundColor: "white",
        border: "20px solid white",
        borderImageSource: `url(${BorderImage})`,
        borderImageSlice: "37 51 47 47",
        borderImageWidth: "13px 13px 14px 13px",
        borderImageOutset: "10px 10px 13px 11px",
        borderImageRepeat: "repeat repeat",
        padding: "20px",
        borderRadius: "10px",
        position: "relative",
      }}
      direction="column"
      justifyContent="center"
    >
      <Typography variant="h1" sx={{ fontFamily: "BMEULJIRO" }}>
        갓생살기
      </Typography>
      <Typography variant="h4" sx={{ fontFamily: "BMEULJIRO" }}>
        - 쉽게만 살아가면 재미없어 빙고
      </Typography>

      <Divider sx={{ margin: "20px 0" }} />

      <Typography fontSize={18} lineHeight={2} whiteSpace="pre-wrap">
        {"\t"}
        <b>갓생살기</b>는 갓생러
        <span style={{ color: "#939393", fontSize: "14px" }}>God+生+-er</span>
        들을 위한 갓생빙고 플랫폼입니다. <br />
        40여 개의 갓생 목표 중 9개를 선택해 세 빙고를 달성해보세요.{" "}
        <b>갓생살기</b>는 매일의 갓생 목표를 달성하고, 친구들과 쉽게 공유할 수
        있도록 도와드립니다. <br />
        {"\t"}나를 위한 갓생, 지금 바로 <b>갓생살기</b>와 시작해보세요.
      </Typography>
      <img
        src={Stamp}
        alt="stamp"
        style={{ position: "absolute", bottom: "5%", right: "2%" }}
      />
    </Stack>
  );
};

export default LoginBanner;
