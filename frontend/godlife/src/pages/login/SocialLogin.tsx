import { Button, Stack } from "@mui/material";
import axios from "axios";

import React from "react";
import GoogleLogin from "react-google-login";

import { ReactComponent as GoogleLoginImage } from "../../assets/logo/Brand/oAuth/google/google.svg";
import { ReactComponent as KakaoLoginImage } from "../../assets/logo/Brand/oAuth/kakao/kakao.svg";

const SocialLogin = () => {
  const responseGoogle = async (res: any) => {
    console.log(1, res);
    let jwtToken = await axios.post("oauth/google", JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.data);
      localStorage.setItem("token", jwtToken.data);
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY!}
        render={(renderProps) => (
          <Button
            sx={{ padding: 0 }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <GoogleLoginImage />
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />

      <Button sx={{ padding: 0 }}>
        <KakaoLoginImage />
      </Button>
    </Stack>
  );
};

export default SocialLogin;
