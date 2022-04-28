import { ThemeProvider } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import { useEffect } from "react";

import CommonDialog from "./components/common/CommonDialog";
import CommonLoading from "./components/common/CommonLoading";
import CommonSnackbar from "./components/common/CommonSnackbar";
import { theme } from "./components/common/theme";
import { useLogout } from "./hooks/useAuth";
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

  const logout = useLogout();

  useEffect(() => {
    setInterval(() => {
      axios
        .get("user/refresh-token", {
          headers: {
            RefreshToken: `${localStorage.getItem("refreshtoken")}`,
          },
        })
        .then((res) =>
          localStorage.setItem("token", res.headers["authorization"])
        )
        .catch(() => {
          logout();
        });
    }, 600000 - 60000);
  }, [logout]);

  return (
    <ThemeProvider theme={theme}>
      <CommonDialog />
      <CommonSnackbar />
      <CommonLoading />
      <Router />
    </ThemeProvider>
  );
}

export default App;
