import dayjs from "dayjs";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/loading";
import { selectTodayBingo, setTodayBingo } from "../store/todayBingo";
import { selectUser, setLoggedUser } from "../store/user";
import axiosWithToken from "../utils/axios";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = useAppSelector(selectTodayBingo);

  const { email } = useAppSelector(selectUser);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(setLoading(true));
    if (!email && token) {
      axiosWithToken.get("user/info").then((res) => {
        dispatch(setLoggedUser(res.data));
        axiosWithToken
          .get(`bingo/date/${dayjs().format("YYYY-MM-DD")}`)
          .then((res) => {
            dispatch(setTodayBingo(res.data.code));
            navigate(`/bingo/${res.data.code}`);
          })
          .catch(() => {
            dispatch(setTodayBingo("none"));
            navigate("/create");
          });
      });
      // .catch(() => console.log("Main"));
    } else if (code && code !== "none") {
      navigate(`/bingo/${code}`);
    } else {
      navigate("/create");
    }
    dispatch(setLoading(false));
  }, [code, navigate, dispatch, email, token]);

  return null;
};

export default Main;
