import axios from "axios";
import dayjs from "dayjs";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/loading";
import { selectTodayBingo, setTodayBingo } from "../store/todayBingo";
import { selectUser, setLoggedUser } from "../store/user";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = useAppSelector(selectTodayBingo);

  const { email } = useAppSelector(selectUser);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(setLoading(true));
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
            .then((res) => {
              dispatch(setTodayBingo(res.data.code));
              navigate(`/bingo/${res.data.code}`);
            })
            .catch(() => {
              dispatch(setTodayBingo("none"));
              navigate("/create");
            });
        });
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
