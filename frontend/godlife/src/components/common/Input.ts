import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px",
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.1)",
    background: "#FAFAFA",
    "& fieldset": {
      border: "solid 1px #C4C4C4",
    },
    "&:hover fieldset": {
      border: "solid 1px #C4C4C4",
    },
    "&.Mui-focused fieldset": {
      border: "solid 1px #C4C4C4",
    },
    "&.Mui-disabled fieldset": {
      border: "solid 1px #C4C4C4",
    },
  },
  "& input::placeholder": {
    fontFamily: "Noto Sans KR",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Noto Sans KR",
  },
}));

export { OutlinedInput };
