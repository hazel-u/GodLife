import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";

import BorderImage from "../../assets/images/border.webp";
import Bingo from "../../components/Bingo/Bingo";
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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openFollowDialog, setOpenFollowDialog] = useState(false);
  const bingo = useAppSelector(selectBingo);
  const code = useAppSelector(selectTodayBingo);

  const getUserInfo = () => {
    axiosWithToken.get("user/info").then((res) => {
      dispatch(setLoggedUser(res.data));
    });
  };

  const getBingo = useCallback(() => {
    axios
      .get(`bingo/${code}`)
      .then((res) => {
        dispatch(setBingo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    getBingo();
    getUserInfo();
  }, [getBingo]);

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
          border: "20px solid white",
          borderImageSource: `url(${BorderImage})`,
          borderImageSlice: "37 51 47 47",
          borderImageWidth: "13px 13px 14px 13px",
          borderImageOutset: "13px 13px 13px 11px",
          borderImageRepeat: "repeat repeat",
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
          <Typography sx={{ whiteSpace: "pre-line", margin: "3% 0" }}>
            오늘의 갓생
          </Typography>
          <Stack direction="column" alignItems="center">
            {code && code !== "none" && bingo.code && (
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
            )}
          </Stack>
          <ProfileRecord />
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
