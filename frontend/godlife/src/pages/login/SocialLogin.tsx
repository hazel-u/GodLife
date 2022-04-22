import { Stack } from "@mui/material";

import React from "react";

const SocialLogin = () => {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <img
        src={require("../../assets/logo/Brand/oAuth/google/btn_google_signin_light_normal_web.png")}
        alt="google login"
      />
      <img
        src={require("../../assets/logo/Brand/oAuth/kakao/kakao_login_medium_narrow.png")}
        alt="kakao login"
      />
    </Stack>
  );
};

export default SocialLogin;
