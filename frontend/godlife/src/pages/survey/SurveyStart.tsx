import { Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import SurveyStartWoman from "../../assets/images/survey/SurveyStartWoman.png";
import Logo from "../../assets/logo/Godlife/logo.svg";
import { BlackButton } from "../../components/common/Button";

const SurveyStart = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <img src={Logo} alt="logo" style={{ width: "60px", height: "60px" }} />
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={2}>
        갓생러 테스트
      </Typography>
      <Typography fontSize={15} fontFamily={"BMEULJIRO"} mt={2}>
        나는 어떤 타입의 갓생러일까?
      </Typography>
      <img src={SurveyStartWoman} alt="" />
      <BlackButton
        onClick={() => {
          navigate("inprogress");
        }}
        sx={{ width: "44%" }}
      >
        시작하기
      </BlackButton>
    </Stack>
  );
};

export default SurveyStart;
