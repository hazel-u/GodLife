import axios from "axios";
import Router from "./router/router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUser, setLoggedUser } from "./store/user";

function App() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectUser);
  if (!email) {
    axios
      .get("user/info", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(setLoggedUser(res.data));
      });
  }

  return <Router />;
}

export default App;
