import React from "react";
import GoogleButton from "../../assets/oAuth/google/btn_google_signin_light_normal_web.png";
import KakaoButton from "../../assets/oAuth/kakao/kakao_login_medium_wide.png";
import { Stack } from "@mui/material";

const SocialLogin = () => {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <img
        src={require("../../assets/oAuth/google/btn_google_signin_light_normal_web.png")}
        alt="google login"
      />
      <img
        src={require("../../assets/oAuth/kakao/kakao_login_medium_narrow.png")}
        alt="kakao login"
      />
    </Stack>
  );
};

export default SocialLogin;
