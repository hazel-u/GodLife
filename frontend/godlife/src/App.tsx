import axios from "axios";
import CommonSnackbar from "./components/common/CommonSnackbar";
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
    <>
      <CommonSnackbar />
      <Router />
    </>
  );

}


export default App;
