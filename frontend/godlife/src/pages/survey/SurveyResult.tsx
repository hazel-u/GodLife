import { Box, Stack, Typography } from "@mui/material";

import { useState } from "react";

import SurveyResultHorse from "../../assets/images/survey/SurveyResultHorse.png";
import { BlackButton } from "../../components/common/Button";

const SurveyResult = () => {
  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <Typography fontSize={20} fontFamily={"BMEULJIRO"}>
        나의 유형은?
      </Typography>
      <img src={SurveyResultHorse} alt="" />
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={2}>
        눈 앞의 목표를 향해 질주!
      </Typography>
      <Typography fontSize={40} fontFamily={"BMEULJIRO"} mt={2}>
        경주마형
      </Typography>
      <Typography>엄청난 설명! %A20 대단한 내용! </Typography>

      <BlackButton sx={{ width: "100%", marginTop: 5 }}>
        '갓생살기'에서 재미있게 갓생 살아보기
      </BlackButton>
      <BlackButton sx={{ width: "100%", marginTop: 5 }}>
        테스트 다시 하기
      </BlackButton>
    </Stack>
  );
};

export default SurveyResult;
