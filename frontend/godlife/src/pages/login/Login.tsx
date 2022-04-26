import { Box, Divider, Grid } from "@mui/material";

import React from "react";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { TextButton } from "../../components/common/Button";
import LoginBanner from "./LoginBanner";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const Login = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item md={8} display={{ xs: "none", md: "block" }}>
        <LoginBanner />
      </Grid>

      <Divider
        orientation="vertical"
        flexItem
        sx={(theme) => ({
          [theme.breakpoints.down(900)]: {
            display: "none",
          },
        })}
      />

      <Grid item xs={10} md={3}>
        <Box sx={{ maxWidth: "300px", margin: "auto" }}>
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

          <SocialLogin />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
