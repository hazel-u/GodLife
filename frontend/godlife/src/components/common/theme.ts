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
      default: "rgba(220, 207, 185, 0.3)",
    },
    primary: {
      main: "#BB9B72",
    },
    secondary: {
      main: "#DCCFB9",
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
