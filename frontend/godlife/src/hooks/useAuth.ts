import axios from "axios";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../store/hooks";
import { setSnackbar } from "../store/snackbar";
import { setTodayBingo } from "../store/todayBingo";
import { clearLoggedUser, setLoggedUser } from "../store/user";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("expired");
    dispatch(setTodayBingo(""));
    dispatch(clearLoggedUser());
    dispatch(
      setSnackbar({
        open: true,
        message: "로그아웃 되었습니다.",
        severity: "success",
      })
    );
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  return () => {
    navigate("/");
    dispatch(
      setSnackbar({
        open: true,
        message: "로그인이 완료되었습니다.",
        severity: "success",
      })
    );

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
          navigate("/login");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshtoken");
          localStorage.removeItem("expired");
          dispatch(setTodayBingo(""));
          dispatch(clearLoggedUser());
          dispatch(
            setSnackbar({
              open: true,
              message: "로그아웃 되었습니다.",
              severity: "success",
            })
          );
        });
    }, 600000 - 60000);

    token &&
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
                Authorization: res.data.jwtToken,
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
  };
};
