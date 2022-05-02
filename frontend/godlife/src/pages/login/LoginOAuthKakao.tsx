import axios from "axios";
import qs from "qs";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useAuth";
import axiosWithToken from "../../utils/axios";

const LoginOAuthKakao = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useLogin();

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
            axiosWithToken.defaults.headers.common["Authorization"] =
              res.data.jwtToken;
            Promise.resolve()
              .then(() => {
                localStorage.setItem("token", res.data.jwtToken);
                localStorage.setItem("refreshtoken", res.data.refreshToken);
                localStorage.setItem(
                  "expired",
                  `${new Date().getTime() + 60000 * 2}`
                );
              })
              .then(() => {
                login();
              });
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, [code, navigate, dispatch, login]);

  return null;
};

export default LoginOAuthKakao;
