import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "NotoSerifKR",
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
      primary: "#000000",
    },
    divider: "#939393",
  },
});
