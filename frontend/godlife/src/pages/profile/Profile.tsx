import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stamp from "../../assets/images/stamp.webp";
import Bingo from "../../components/Bingo/Bingo";
import { BlackButton } from "../../components/common/Button";
import { selectBingo, setBingo } from "../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTodayBingo } from "../../store/todayBingo";
import { setLoggedUser } from "../../store/user";
import axiosWithToken from "../../utils/axios";
import ProfileFollow from "./ProfileFollow";
import ProfileFollowDialog from "./ProfileFollowDialog";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import ProfileSettingDialog from "./ProfileSettingDialog";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openFollowDialog, setOpenFollowDialog] = useState(false);
  const bingo = useAppSelector(selectBingo);
  const code = useAppSelector(selectTodayBingo);

  const getUserInfo = useCallback(() => {
    axiosWithToken.get("user/info").then((res) => {
      dispatch(setLoggedUser(res.data));
    });
  }, [dispatch]);

  const getBingo = useCallback(() => {
    axios
      .get(`bingo/${code}`)
      .then((res) => {
        dispatch(setBingo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code, dispatch]);

  useEffect(() => {
    if (code && code !== "none") {
      getBingo();
    }
    getUserInfo();
  }, [getBingo, getUserInfo, code]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ProfileSettingDialog open={open} setOpen={setOpen} />
      <ProfileFollowDialog
        open={openFollowDialog}
        setOpenFollowDialog={setOpenFollowDialog}
      />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
          padding: "60px 0",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "772px",
            [theme.breakpoints.down(800)]: {
              width: "548px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "324px",
            },
          })}
        >
          <ProfileInfo setOpen={setOpen} />
          <ProfileFollow setOpenFollowDialog={setOpenFollowDialog} />

          <Box
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            {bingo.code && code && code !== "none" ? (
              <Stack direction="column" alignItems="center">
                <Box
                  sx={{ width: "100%", maxWidth: "550px", textAlign: "center" }}
                >
                  <Typography fontSize={22} fontFamily="BMEULJIRO">
                    {bingo.title}
                  </Typography>
                  <Bingo
                    createdBy={bingo.userName}
                    size={3}
                    goals={bingo.goals}
                    mode={"Active"}
                    startDate={bingo.startDate}
                    godlife={bingo.godlife}
                    id={bingo.id}
                  />
                </Box>
              </Stack>
            ) : (
              <Stack
                sx={{
                  height: "100%",
                  textAlign: "center",
                  width: "100%",
                  marginTop: "20%",
                }}
              >
                <Box position="relative">
                  <Typography
                    sx={{
                      fontSize: fullScreen ? 16 : 18,
                      margin: "3% 0",
                    }}
                  >
                    오늘의 갓생이 없습니다.
                  </Typography>
                  <img
                    src={Stamp}
                    alt="stamp"
                    style={{
                      position: "absolute",
                      top: "-50px",
                      left: "45%",
                      opacity: "30%",
                    }}
                  />
                  <BlackButton
                    style={{
                      width: "35%",
                      margin: "10% 0",
                    }}
                    onClick={() => navigate("/create")}
                  >
                    갓생 살러 가기
                  </BlackButton>
                </Box>
              </Stack>
            )}
          </Box>
          <ProfileRecord />
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
