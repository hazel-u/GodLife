import { ThemeProvider } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import CommonDialog from "./components/common/CommonDialog";
import CommonSnackbar from "./components/common/CommonSnackbar";
import { theme } from "./components/common/theme";
import Router from "./router/router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setTodayBingo } from "./store/todayBingo";
import { selectUser, setLoggedUser } from "./store/user";

function App() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectUser);
  const token = localStorage.getItem("token");

  if (!email && token) {
    axios
      .get("user/info", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setLoggedUser(res.data));
        axios
          .get(`bingo/date/${dayjs().format("YYYY-MM-DD")}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => dispatch(setTodayBingo(res.data.code)))
          .catch((err) => console.log(err));
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <CommonDialog />
      <CommonSnackbar />
      <Router />
    </ThemeProvider>
  );
}

export default App;
