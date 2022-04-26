import axios from "axios";
import qs from "qs";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const code = new URL(window.location.href).searchParams.get("code");

  const history = useNavigate();
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      console.log(res.data.access_token);
      const payloadToServer = JSON.stringify({});

      const res2 = await axios.post(
        "http://localhost:8080/api/oauth/kakao",
        {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        },
        config
      );

      console.log("res2->", res2);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return null;
};

export default Auth;
