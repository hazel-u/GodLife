import { Grid, Hidden, Stack } from "@mui/material";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import Profile from "../../pages/profile/Profile";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { clearLoggedUser } from "../../store/user";
import { TextButton } from "../common/Button";
import MobileNavbarDialog from "./MobileNavbarDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const pageNameList: { [key: string]: string } = {
    "/": "메인",
    "/today": "오늘의 갓생",
    "/list": "이전의 갓생",
    "/group": "내 그룹",
    "/item": "아이템 샵",
  };

  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    navigate("login");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    dispatch(clearLoggedUser());
    dispatch(
      setSnackbar({
        open: true,
        message: "로그아웃 되었습니다.",
        severity: "success",
      })
    );
  };

  return (
    <>
      <Profile open={open} setOpen={setOpen} />

      <Hidden smDown>
        <Grid
          container
          alignItems="end"
          sx={{
            padding: "10px 10px 40px 10px",
          }}
        >
          <Grid item sm={5}>
            <Stack direction="row" justifyContent="space-around">
              <TextButton href="/bingo/123">오늘의 갓생</TextButton>
              <TextButton href="/list">이전의 갓생</TextButton>

              <TextButton
                onClick={() => {
                  dispatch(
                    setSnackbar({
                      open: true,
                      message: "서비스 준비중입니다.",
                      severity: "info",
                    })
                  );
                }}
              >
                내 그룹
              </TextButton>
            </Stack>
          </Grid>
          <Grid
            item
            sm={2}
            sx={{
              textAlign: "center",
            }}
          >
            <Logo width="100px" height="100px" />
          </Grid>
          <Grid item sm={5}>
            <Stack direction="row" justifyContent="space-around">
              <TextButton
                onClick={() => {
                  dispatch(
                    setSnackbar({
                      open: true,
                      message: "서비스 준비중입니다.",
                      severity: "info",
                    })
                  );
                }}
              >
                아이템 샵
              </TextButton>
              <TextButton onClick={() => setOpen(true)}>내 정보</TextButton>
              <TextButton onClick={logout}>로그아웃</TextButton>
            </Stack>
          </Grid>
        </Grid>
      </Hidden>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        display={{ sm: "none", md: "none" }}
        sx={{
          padding: "10px",
        }}
      >
        <Grid
          item
          xs
          sx={{
            textAlign: "left",
          }}
        >
          <Logo width="70px" height="70px" />
        </Grid>
        <Grid
          item
          xs
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{pageNameList[location.pathname]}</p>
        </Grid>
        <Grid item xs>
          <MobileNavbarDialog logout={logout} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
