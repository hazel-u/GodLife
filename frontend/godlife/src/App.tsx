import { ThemeProvider } from "@mui/material";
import axios from "axios";
import CommonDialog from "./components/common/CommonDialog";
import CommonSnackbar from "./components/common/CommonSnackbar";
import { theme } from "./components/common/theme";
import Router from "./router/router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
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
