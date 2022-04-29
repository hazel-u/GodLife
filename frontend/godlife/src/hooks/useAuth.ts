import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../store/hooks";
import { setSnackbar } from "../store/snackbar";
import { setTodayBingo } from "../store/todayBingo";
import { clearLoggedUser, setLoggedUser } from "../store/user";
import axiosWithToken from "../utils/axios";

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
    dispatch(
      setSnackbar({
        open: true,
        message: "로그인이 완료되었습니다.",
        severity: "success",
      })
    );

    axiosWithToken.get("user/info").then((res) => {
      dispatch(setLoggedUser(res.data));
      axiosWithToken
        .get(`bingo/date/${dayjs().format("YYYY-MM-DD")}`)
        .then((res) => {
          dispatch(setTodayBingo(res.data.code));
          navigate(`/bingo/${res.data.code}`);
        })
        .catch(() => {
          console.log("useAuth");
          dispatch(setTodayBingo("none"));
          navigate("/create");
        });
    });
  };
};
