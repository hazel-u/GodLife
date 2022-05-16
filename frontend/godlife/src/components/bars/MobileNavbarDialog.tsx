import { Global } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import { selectTodayBingo } from "../../store/todayBingo";
import { selectUser } from "../../store/user";
import { TextButton } from "../common/Button";
import "./bars.css";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  height: "100%",
  borderRadius: "30px 30px 0 0",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer({
  logout,
}: {
  logout: () => void;
}) {
  const isAuth = localStorage.getItem("token");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };
  const navigate = useNavigate();
  const { name } = useAppSelector(selectUser);
  const code = useAppSelector(selectTodayBingo);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `max(400px, calc(50% - ${drawerBleeding}px))`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "right" }}>
        <IconButton sx={{ width: "26px" }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          style: {
            borderRadius: "30px 30px 0 0",
          },
        }}
      >
        <StyledBox>
          <Puller />
          <Stack
            direction="column"
            justifyContent="start"
            alignItems="center"
            paddingTop="20px"
            height="90%"
          >
            <Stack>
              {isAuth ? (
                <h4>{name}님, 갓생사세요!</h4>
              ) : (
                <h4>오늘도 갓생사세요!</h4>
              )}
              <div className="division-line" />
            </Stack>

            <Stack
              direction="column"
              justifyContent="space-around"
              sx={{ height: "100%" }}
            >
              <TextButton
                onClick={() => {
                  if (code && code !== "none") {
                    navigate(`/bingo/${code}`);
                  } else {
                    navigate("create");
                  }
                  setDrawerOpen(false);
                }}
              >
                오늘의 갓생
              </TextButton>
              <TextButton href="/list">이전의 갓생</TextButton>

              <TextButton href="/feed">모두의 갓생</TextButton>

              {isAuth ? (
                <>
                  <TextButton
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate("/profile");
                    }}
                  >
                    내 정보
                  </TextButton>
                  <TextButton onClick={logout}>로그아웃</TextButton>
                </>
              ) : (
                <TextButton
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/login");
                  }}
                >
                  로그인
                </TextButton>
              )}
            </Stack>
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
