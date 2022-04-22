import { Box, Divider, Grid } from "@mui/material";

import React from "react";

import Logo from "../../assets/logo/Godlife/logo.svg";
import Bingo from "../../components/common/Bingo/Bingo";
import { TextButton } from "../../components/common/Button";
import LoginBanner from "./LoginBanner";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const exampleBingo = [
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
];

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
        <Bingo
          title={"도와주세요!! 개발자가 갇혀있어요!"}
          createdBy={"백우민"}
          size={3}
          goals={exampleBingo}
          mode={"Active"}
          date={new Date()}
          streak={1}
          totalUses={1}
        ></Bingo>
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
