import { Global } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
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
  setOpen,
}: {
  logout: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useAppSelector(selectUser);
  const code = useAppSelector(selectTodayBingo);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
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
            paddingTop="10px"
            height="100%"
          >
            <Stack>
              <h4>{name}님, 갓생사세요!</h4>
              <div className="division-line" />
            </Stack>
            <Box sx={{ height: "70%" }}>
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
                  }}
                >
                  오늘의 갓생
                </TextButton>
                <TextButton href="/list">이전의 갓생</TextButton>

                <Tooltip title={"서비스 준비중입니다."}>
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
                    모두의 갓생
                  </TextButton>
                </Tooltip>

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
