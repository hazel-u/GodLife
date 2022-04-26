import { Button, Stack } from "@mui/material";

import React from "react";
import GoogleLogin from "react-google-login";

import { ReactComponent as GoogleLoginImage } from "../../assets/logo/Brand/oAuth/google/google.svg";
import { ReactComponent as KakaoLoginImage } from "../../assets/logo/Brand/oAuth/kakao/kakao.svg";

const SocialLogin = () => {
  const responseGoogle = (res: any) => {
    console.log(res);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY!}
        buttonText="구글로 계속하기"
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
      />

      <Button sx={{ padding: 0 }}>
        <KakaoLoginImage />
      </Button>
    </Stack>
  );
};

export default SocialLogin;
