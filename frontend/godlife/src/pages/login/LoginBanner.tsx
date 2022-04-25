import { Divider, Stack, Typography } from "@mui/material";

import React from "react";

const LoginBanner = () => {
  return (
    <Stack
      sx={{
        height: "90vh",
        margin: "20px",
        backgroundColor: "#F3F3F3",
        padding: "20px",
      }}
      direction="column"
      justifyContent="center"
    >
      <Typography variant="h1" sx={{ fontFamily: "BMEULJIRO" }}>
        갓생살기
      </Typography>
      <Typography variant="h4" sx={{ fontFamily: "BMEULJIRO" }}>
        쉽게만 살아가면 재미없어 빙고
      </Typography>
      <Divider />
      <h3>갓생살기는 갓생러(God+生+-er)들을 위한 갓생빙고 플랫폼입니다.</h3>
      <h4>
        갓생살기에서 매일 매일의 갓생을 작성하고 공유해보세요. <br />
        사소해도 나를 위한 건강한 생활 습관을 형성할 수 있도록 갓생살기가
        도와줍니다.
        <br /> 스스로 꾸준한 동기부여를 통해 현실 생활에 집중하고 성취감을
        느끼며, 자기 자신을 돌보고, 생산적인 삶을 시작해보세요.
      </h4>
    </Stack>
  );
};

export default LoginBanner;
