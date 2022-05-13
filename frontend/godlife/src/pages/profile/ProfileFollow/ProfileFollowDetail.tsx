import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import Bingo from "../../../components/Bingo/Bingo";
import {
  selectFollowingUser,
  setFollowingUser,
} from "../../../store/following";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ProfileFollowDetailRecord from "./ProfileFollowDetailRecord";

const ProfileFollowDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const paramId = params.name;

  const getOtherInfo = useCallback(() => {
    axios
      .get(`user/info/${params.name}`)
      .then((res) => {
        dispatch(setFollowingUser(res.data));
      })
      .catch((err) => console.log(err));
  }, [params, dispatch]);

  useEffect(() => {
    getOtherInfo();
  }, [getOtherInfo]);

  const {
    name,
    info,
    followerCount,
    followingCount,
    godCount,
    serialGodCount,
    todayBingo,
  } = useAppSelector(selectFollowingUser);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              height: "65px",
              "& p": {
                fontFamily: "BMEULJIRO",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: fullScreen ? 26 : 30,
                fontFamily: "BMEULJIRO",
              }}
            >
              {name} 님의 프로필
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 18,
              margin: "0 0 20px",
            }}
          >
            {info}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            갓생 달성 {godCount}일 | 연속 갓생 달성 {serialGodCount}일
          </Typography>
          <Box>
            <Typography
              sx={{
                whiteSpace: "pre-line",
                margin: "2px 0",
                cursor: "pointer",
              }}
            >
              팔로워{" "}
              <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
                {followingCount}{" "}
              </span>{" "}
              | 팔로잉{" "}
              <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
                {followerCount}{" "}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              marginBottom: todayBingo !== null && todayBingo.code ? 0 : "20%",
            }}
          >
            <Typography
              sx={{
                fontSize: fullScreen ? 16 : 18,
                margin: "3% 0",
              }}
            >
              오늘의 갓생
            </Typography>
            {todayBingo !== null && todayBingo.code ? (
              <Stack direction="column" alignItems="center">
                <Box
                  sx={{ width: "100%", maxWidth: "550px", textAlign: "center" }}
                >
                  <Typography fontSize={22} fontFamily="BMEULJIRO">
                    {todayBingo.title}
                  </Typography>
                  <Bingo
                    createdBy={todayBingo.userName}
                    size={3}
                    goals={todayBingo.goals}
                    mode={"Active"}
                    startDate={todayBingo.startDate}
                    godlife={todayBingo.godlife}
                    id={todayBingo.id}
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
                </Box>
              </Stack>
            )}
          </Box>
          <ProfileFollowDetailRecord name={paramId} />
        </Box>
      </Stack>
    </>
  );
};

export default ProfileFollowDetail;
