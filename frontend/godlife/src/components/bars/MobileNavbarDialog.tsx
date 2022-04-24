import { Global } from "@emotion/react";
import customStyled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import * as React from "react";
import { useState } from "react";

import menu from "../../assets/icon/menu.png";
import { TextButton } from "../common/Button";
import "./bars.css";

const MenuIcon = customStyled.img`
	width: 48px;
	height: 48px;
`;

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
  setOpen,
}: {
  logout: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box sx={{ textAlign: "right" }}>
        <MenuIcon
          src={menu}
          style={{ width: "20px", height: "20px" }}
          onClick={toggleDrawer(true)}
        ></MenuIcon>
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
            paddingTop="10px"
            height="100%"
          >
            <Stack>
              <h4>갓생러님, 갓생사세요!</h4>
              <div className="division-line" />
            </Stack>
            <Box sx={{ height: "80%" }}>
              <Stack
                direction="column"
                justifyContent="space-around"
                sx={{ height: "100%" }}
              >
                <TextButton href="/today">오늘의 갓생</TextButton>
                <TextButton href="/list">이전의 갓생</TextButton>
                <TextButton href="/group">내 그룹</TextButton>
                <TextButton href="/item">아이템 샵</TextButton>
                <TextButton
                  onClick={() => {
                    setDrawerOpen(false);
                    setOpen(true);
                  }}
                >
                  내 정보
                </TextButton>
                <TextButton onClick={logout}>로그아웃</TextButton>
              </Stack>
            </Box>
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
