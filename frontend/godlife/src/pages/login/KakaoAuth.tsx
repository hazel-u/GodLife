import axios from "axios";
import dayjs from "dayjs";
import qs from "qs";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setTodayBingo } from "../../store/todayBingo";
import { setLoggedUser } from "../../store/user";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      axios.post("https://kauth.kakao.com/oauth/token", payload).then((res) => {
        axios
          .post(
            "oauth/kakao",
            {
              accessToken: res.data.access_token,
              refreshToken: res.data.refresh_token,
            },
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
            }
          )
          .then((res) => {
            localStorage.setItem("token", res.data.jwtToken);
            axios
              .get("user/info", {
                headers: {
                  Authorization: res.data.jwtToken,
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
                  .then((res) => dispatch(setTodayBingo(res.data.code)))
                  .catch((err) => console.log(err));
              });
            navigate("/");
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, [code, navigate, dispatch]);

  return null;
};

export default Auth;
