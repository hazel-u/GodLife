import { Box, Divider, Stack } from "@mui/material";

import React from "react";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { TextButton } from "../../components/common/Button";
import LoginBanner from "./LoginBanner";
import LoginForm from "./LoginForm/LoginForm";
import LoginOAuth from "./LoginOAuth";

const Login = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={(theme) => ({
        height: "100%",
        width: "100%",
        [theme.breakpoints.up("md")]: {
          backgroundColor: "white",
        },
      })}
    >
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{ backgroundColor: "#F2F2F2", height: "100%", flex: 1 }}
      >
        <Box
          sx={{
            maxWidth: "1400px",
            height: "100%",
            width: "100%",
            margin: "0 50px 0 auto",
            overflow: "hidden",
          }}
        >
          <LoginBanner />
        </Box>
      </Box>

      <Box width="max(400px, 30%)" margin="0 auto">
        <Box width="300px" margin="0 auto 0 50px">
          <Box sx={{ textAlign: "center" }}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "120px", margin: "30px" }}
            />
          </Box>

          <LoginForm />

          <Box sx={{ textAlign: "right" }}>
            <TextButton disableRipple={true} href="/join">
              회원가입
            </TextButton>
          </Box>

          <Divider
            sx={{ fontSize: "14px", color: "#6D6D6D", margin: "10px 0" }}
          >
            혹은
          </Divider>

          <LoginOAuth />
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
