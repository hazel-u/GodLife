import { Stack, Typography } from "@mui/material";

import Logo from "../../assets/logo/Godlife/logo.svg";

const SurveyStart = () => {
  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <img src={Logo} alt="logo" style={{ width: "60px", height: "60px" }} />
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={2}>
        갓생러 테스트
      </Typography>
      <Typography fontSize={15} fontFamily={"BMEULJIRO"} mt={2}>
        나는 어떤 타입의 갓생러일까?
      </Typography>
    </Stack>
  );
};

export default SurveyStart;
