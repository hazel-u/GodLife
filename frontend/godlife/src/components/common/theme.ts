import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Noto Serif KR",
      color: "#464646",
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "rgb(252, 252, 252)",
    },
    primary: {
      main: "#A11803",
    },
    secondary: {
      main: "#939393",
    },
    info: {
      main: "#5C79BA",
    },
    success: {
      main: "#23AA6E",
    },
    error: {
      main: "#a1033d",
    },
    warning: {
      main: "#EC6953",
    },
    text: {
      primary: "#464646",
    },
    divider: "#9B9B9B",
  },
});
