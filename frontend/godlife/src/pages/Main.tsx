import axios from "axios";
import dayjs from "dayjs";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTodayBingo, setTodayBingo } from "../store/todayBingo";
import { selectUser, setLoggedUser } from "../store/user";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = useAppSelector(selectTodayBingo);

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

  useEffect(() => {
    if (code) {
      navigate(`/bingo/${code}`);
    } else {
      navigate("create");
    }
  }, [code, navigate]);

  return null;
};

export default Main;
