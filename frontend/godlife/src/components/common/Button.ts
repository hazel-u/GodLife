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
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const BlackButton = styled(Button)({
  width: "100%",
  maxWidth: "300px",
  borderRadius: 10,
  backgroundColor: "black",
  color: "#f3f3f3",
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "black",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {
    // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const TextButton = styled(Button)({
  "&:hover": {
    color: "#000000",
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
