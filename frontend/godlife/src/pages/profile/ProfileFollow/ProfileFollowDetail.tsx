import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { BlackButton, OutlinedButton } from "../../../components/common/Button";
import {
  selectFollowingUser,
  setFollowingUser,
} from "../../../store/following";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";
import ProfileFollowDetailRecord from "./ProfileFollowDetailRecord";

const ProfileFollowDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const paramId = params.name;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingList, setFollowingList] = useState<any>([]);

  const getOtherInfo = useCallback(() => {
    axios
      .get(`user/info/${params.name}`)
      .then((res) => {
        dispatch(setFollowingUser(res.data));
      })
      .catch(() => {});
  }, [params, dispatch]);

  const {
    name,
    info,
    followerCount,
    followingCount,
    godCount,
    serialGodCount,
    todayBingo,
  } = useAppSelector(selectFollowingUser);

  const getFollowingList = useCallback(() => {
    axiosWithToken
      .get("user/following")
      .then((res) => {
        const nameList: any[] = [];
        res.data.map((value: any) => {
          nameList.push(value.name);
          return nameList;
        });
        setFollowingList(nameList);
        const nowFollowing = nameList.includes(name);
        setIsFollowing(nowFollowing);
      })
      .catch(() => {});
  }, [setFollowingList, setIsFollowing, name]);

  useEffect(() => {
    getFollowingList();
  }, [getFollowingList]);

  useEffect(() => {
    getOtherInfo();
  }, [getOtherInfo]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const manageFollow = () => {
    const nowFollowing = followingList.includes(name);

    let request;
    if (nowFollowing) {
      request = axiosWithToken.delete(`feed/follow/${name}`);
      setIsFollowing(false);
    } else {
      request = axiosWithToken.post(`feed/follow/${name}`);
      setIsFollowing(true);
    }
    request
      .then(() => {
        getOtherInfo();
        dispatch(
          setSnackbar({
            open: true,
            message: nowFollowing
              ? `${name}?????? ?????????????????????.`
              : `${name}?????? ??????????????????.`,
            severity: "success",
          })
        );
      })
      .catch(() =>
        dispatch(
          setSnackbar({
            open: true,
            message: "?????? ??????????????????.",
            severity: "error",
          })
        )
      );
  };

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
            justifyContent="center"
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
              {name} ?????? ?????????
            </Typography>
            {isFollowing ? (
              <OutlinedButton
                style={{
                  width: "10%",
                  margin: "0 2%",
                  backgroundColor: "#EEEEEE",
                }}
                onClick={() => manageFollow()}
              >
                ?????????
              </OutlinedButton>
            ) : (
              <BlackButton
                style={{
                  width: "10%",
                  margin: "0 2%",
                }}
                onClick={() => manageFollow()}
              >
                ?????????
              </BlackButton>
            )}
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography
              sx={{
                fontSize: 18,
                margin: "2% 0",
              }}
            >
              {info}
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              ?????? ?????? {godCount}??? | ?????? ?????? ?????? {serialGodCount}???
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ margin: "2px 3px", cursor: "pointer" }}>
                ?????????{" "}
                <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
                  {followingCount}{" "}
                </span>{" "}
              </Typography>
              <Typography sx={{ margin: "2px 3px", cursor: "pointer" }}>
                | ?????????{" "}
                <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
                  {followerCount}{" "}
                </span>
              </Typography>
            </Stack>
          </Stack>

          <Divider
            sx={{
              margin: "3% auto 0",
              width: "95%",
            }}
          />

          <Box
            sx={{
              height: "100%",
              width: "100%",
              margin:
                todayBingo !== null && todayBingo.code ? "5% 0 7%" : "0 0 20%",
            }}
          >
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
                  marginTop: "30%",
                }}
              >
                <Box position="relative">
                  <Typography
                    sx={{
                      fontSize: fullScreen ? 16 : 18,
                      margin: "7% 0",
                    }}
                  >
                    ????????? ????????? ????????????.
                  </Typography>
                  <img
                    src={Stamp}
                    alt="stamp"
                    style={{
                      position: "absolute",
                      top: "-90px",
                      left: "45%",
                      opacity: "70%",
                    }}
                  />
                </Box>
              </Stack>
            )}
          </Box>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <ProfileFollowDetailRecord name={paramId} />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ProfileFollowDetail;
