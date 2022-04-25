import { Stack } from "@mui/material";

import React from "react";
import GoogleLogin from "react-google-login";

const SocialLogin = () => {
  const responseGoogle = (res: any) => {
    console.log(res);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY!}
        buttonText="구글로 계속하기"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <img
        src={require("../../assets/logo/Brand/oAuth/kakao/kakao_login_medium_narrow.png")}
        alt="kakao login"
      />
    </Stack>
  );
};

export default SocialLogin;
