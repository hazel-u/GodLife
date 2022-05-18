import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedButton = styled(Button)({
  width: "100%",
  maxWidth: "300px",
  borderRadius: 10,
  borderColor: "#939393",
  color: "#6D6D6D",
  backgroundColor: "white",
  "&:hover": {
    color: "#000000",
    backgroundColor: "white",
    borderColor: "#000000",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "white",
    borderColor: "#000000",
  },
});

const BlackButton = styled(Button)({
  width: "100%",
  maxWidth: "300px",
  borderRadius: 10,
  backgroundColor: "#434343",
  color: "#f3f3f3",
  "&:hover": {
    color: "#fafafa",
    backgroundColor: "#434343",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
});

const TextButton = styled(Button)({
  color: "#484848",
  "&:hover": {
    color: "#464646",
    backgroundColor: "transparent",
    borderColor: "#000000",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "transparent",
    borderColor: "#000000",
  },
  "&:focus": {
    backgroundColor: "transparent",
  },
  "&:disabled": {
    color: "#464646",
  },
});

const GoalButton = styled(Button)(({ theme }) => ({
  position: "relative",
  width: "208px",
  height: "50px",
  border: "1px solid #b3b3b3",
  boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  webkitBorderRadius: "10px",
  mozBorderRadius: "10px",
  color: "#5A5A5A",
  "& p": {
    fontSize: "14px",
  },
  "&:hover": {
    color: "black",
    backgroundColor: "#ffffff",
  },
}));

const SurveyButton = styled(Button)({
  width: "100%",
  maxWidth: "400px",
  fontFamily: "Noto Sans KR",
  fontSize: 17,
  borderRadius: 10,
  wordBreak: "keep-all",
  backgroundColor: "#434343",
  color: "#f3f3f3",
  "&:hover": {
    color: "#fafafa",
    backgroundColor: "#434343",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
});

export { OutlinedButton, TextButton, BlackButton, GoalButton, SurveyButton };
