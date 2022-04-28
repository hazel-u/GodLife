import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Noto Sans KR",
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#A11803",
    },
    secondary: {
      main: "#939393",
    },
    info: {
      main: "#038ca1",
    },
    success: {
      main: "#8ca103",
    },
    error: {
      main: "#a1033d",
    },
    warning: {
      main: "#a16703",
    },
    text: {
      primary: "#000000",
    },
    divider: "#939393",
  },
});
