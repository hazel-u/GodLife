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
  color: "#939393",
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
});

export { OutlinedButton, TextButton, BlackButton };
