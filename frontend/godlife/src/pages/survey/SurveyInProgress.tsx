import { Box, Stack, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { BlackButton } from "../../components/common/Button";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const SurveyInProgress = () => {
  return (
    <Stack direction="column" alignItems="center" mt={4}>
      <img src={Logo} alt="logo" style={{ width: "60px", height: "60px" }} />
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mt={2}>
        테스트 테스트
      </Typography>
      <Typography fontSize={15} fontFamily={"BMEULJIRO"} mt={2}>
        나는 어떤 타입의 갓생러일까?
      </Typography>
      {/* <BlackButton href="/" sx={{ width: "44%" }}>
        시작하기
      </BlackButton> */}
    </Stack>
  );
};

export default SurveyInProgress;
