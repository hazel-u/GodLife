import { Box, Divider, Stack } from "@mui/material";

import React from "react";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { TextButton } from "../../components/common/Button";
import LoginForm from "./LoginForm/LoginForm";
import LoginOAuth from "./LoginOAuth";

const Login = () => {
  return (
    <Stack height="100%" justifyContent="center">
      <Box width="max(400px, 30%)" margin="0 auto">
        <Box
          sx={(theme) => ({
            width: "300px",
            margin: "0 auto 0 50px",
            [theme.breakpoints.down("md")]: {
              margin: "0 auto",
            },
          })}
        >
          <Box sx={{ textAlign: "center" }}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "120px", height: "120px", margin: "30px" }}
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
