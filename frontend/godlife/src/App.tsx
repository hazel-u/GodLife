import { ThemeProvider } from "@mui/material";
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
import axiosWithToken from "./utils/axios";

function App() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectUser);
  const token = localStorage.getItem("token");

  if (!email && token) {
    axiosWithToken
      .get("user/info")
      .then((res) => {
        dispatch(setLoggedUser(res.data));
        axiosWithToken
          .get(`bingo/date/${dayjs().format("YYYY-MM-DD")}`)
          .then((res) => dispatch(setTodayBingo(res.data.code)))
          .catch(() => dispatch(setTodayBingo("none")));
      })
      .catch((err) => {
        if (err.response.data.code === "EXPIRED_TOKEN") {
          logout();
        }
      });
  }

  const logout = useLogout();

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (email) {
      intervalId = setInterval(() => {
        axiosWithToken
          .get("user/refresh-token")
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.headers["authorization"]);
          })
          .catch(() => {
            console.log("만료");
            logout();
          });
      }, 600000 - 120000);
    }
    return () => clearInterval(intervalId);
  }, [logout, email]);

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
