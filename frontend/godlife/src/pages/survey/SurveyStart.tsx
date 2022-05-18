import { Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import SurveyStartWoman from "../../assets/images/survey/SurveyStartWoman.png";
import { SurveyButton } from "../../components/common/Button";
import SurveyShare from "./SurveyShare";

const SurveyStart = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" justifySelf="center" alignItems="center">
      <Stack
        direction="column"
        justifySelf="center"
        alignItems="center"
        sx={{ maxWidth: 500 }}
      >
        <Typography fontSize={45} fontFamily={"BMEULJIRO"} mt={2}>
          갓생러 테스트
        </Typography>
        <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={1} mb={2}>
          나는 어떤 타입의 갓생러일까?
        </Typography>
        <img src={SurveyStartWoman} alt="" />
        <Stack sx={{ marginY: 5 }}>
          <SurveyShare />
        </Stack>
        <SurveyButton
          onClick={() => {
            navigate("inprogress");
          }}
          sx={{ width: "90%", paddingY: 1, fontSize: 20 }}
        >
          시작하기
        </SurveyButton>
      </Stack>
    </Stack>
  );
};

export default SurveyStart;
