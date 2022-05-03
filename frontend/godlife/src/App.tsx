import { ThemeProvider } from "@mui/material";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

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

  if (!email && token && axiosWithToken.defaults.headers) {
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

  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location, initialized]);

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
