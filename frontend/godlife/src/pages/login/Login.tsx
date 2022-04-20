import React, { useState } from "react";
import { Box, Button, Grid, Divider } from "@mui/material";
import LoginForm from "./LoginForm";
import LoginBanner from "./LoginBanner";
import SocialLogin from "./SocialLogin";
import Logo from "../../assets/images/logo.svg";

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
            <img src={Logo} alt="logo" />
          </Box>

          <LoginForm />

          <Box sx={{ textAlign: "right" }}>
            <Button type="button" href="/join">
              회원가입
            </Button>
          </Box>

          <Divider>혹은</Divider>

          <SocialLogin />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
