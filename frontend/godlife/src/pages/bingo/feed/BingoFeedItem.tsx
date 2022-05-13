import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Bingo from "../../../components/Bingo/Bingo";
import { TextButton } from "../../../components/common/Button";
import { BingoType } from "../../../types/bingo";
import BingoDetailLike from "../detail/BingoDetailLike";

interface UserInfoType {
  allBingo: [];
  followerCount: number;
  followingCount: number;
  godCount: number;
  info: string;
  name: string;
  serialGodCount: number;
  todayBingo: {
    activate: true;
    code: string;
    comments: [];
    goals: [];
    godCount: number;
    godlife: true;
    id: string;
    likeCnt: number;
    serialGodCount: number;
    startDate: string;
    title: string;
    userEmail: string;
    userName: string;
  };
}

const BingoFeedItem = ({
  bingo,
  getBingoFeed,
}: {
  bingo: BingoType;
  getBingoFeed: () => void;
}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const getUserInfo = () => {
    axios
      .get(`user/info/${bingo.userName}`)
      .then((res) => setUserInfo(res.data));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Grid
      container
      margin={3}
      key={bingo.id}
      justifyContent="space-between"
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
        padding: "40px",
      }}
    >
      <Grid item xs={12} md={3} lg={3} container justifyContent="space-between">
        <Stack
          direction={{ xs: "row", md: "column" }}
          justifyContent="space-between"
          width={{ xs: "100%", md: "90%" }}
        >
          <Stack
            direction={{ xs: "row", md: "column" }}
            alignItems={{ xs: "center", md: "start" }}
          >
            <Typography fontFamily={"BMEULJIRO"} fontSize={24} marginRight={1}>
              {bingo.userName}
            </Typography>
            <Typography>{userInfo?.info}</Typography>
          </Stack>

          <Box sx={{ "& p": { fontSize: 14 } }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography>{userInfo?.godCount}일 째 갓생 달성 중</Typography>
              <Typography>
                {userInfo?.serialGodCount}일 째 연속 갓생 달성 중
              </Typography>
            </Box>
            <TextButton sx={{ paddingX: 0 }}>프로필보기</TextButton>
          </Box>
        </Stack>

        <Divider
          sx={{ display: { xs: "none", md: "block" } }}
          orientation="vertical"
          flexItem
        />
        <Grid xs={12} display={{ xs: "block", md: "none" }}>
          <Divider sx={{ margin: "20px 0" }} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Box
          onClick={() => navigate(`/bingo/${bingo.code}`)}
          sx={{
            textAlign: "center",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <Typography fontSize={12}>
            {bingo.startDate[0]}년 {bingo.startDate[1]}월 {bingo.startDate[2]}일
          </Typography>
          <Typography
            textAlign={"center"}
            fontFamily={"BMEULJIRO"}
            fontSize={20}
          >
            {bingo.title}
          </Typography>
          <Bingo
            createdBy={bingo.userName}
            size={3}
            goals={bingo.goals}
            mode={"Active"}
            startDate={bingo.startDate}
            godlife={bingo.godlife}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={3} lg={3} sx={{ "& button": { padding: 0 } }}>
        <Grid xs={12} display={{ xs: "block", md: "none" }}>
          <Divider sx={{ margin: "20px 0" }} />
        </Grid>
        <Stack
          direction={{ xs: "row", md: "column" }}
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ "& p": { fontSize: 14 } }}
              alignItems={{ xs: "center", md: "start" }}
            >
              <BingoDetailLike
                getBingo={getBingoFeed}
                likeCnt={bingo.likeCnt}
                seq={bingo.id}
              />
              <Typography
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                | 댓글 {bingo.comments.length}
              </Typography>
            </Stack>

            <Divider
              sx={{
                marginBottom: 2,
                marginTop: 1,
                display: { xs: "none", md: "block" },
              }}
            />

            {bingo.comments.length === 0 && (
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                댓글이 없습니다.
              </Typography>
            )}
            {bingo.comments.slice(0, 3).map((comment) => (
              <Stack
                sx={{
                  display: { xs: "none", md: "block" },
                }}
                spacing={0.5}
                paddingBottom={2}
                key={comment.seq}
              >
                <Stack direction="row" alignItems="end" spacing={1}>
                  <Typography>{comment.nickname}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "#9b9b9b" }}>
                    {dayjs(
                      comment.date.slice(0, 3).join("-") +
                        " " +
                        comment.date.slice(3, 5).join(":")
                    ).format("YYYY.MM.DD HH:mm")}
                  </Typography>
                </Stack>
                <Box maxWidth="100%">
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: `${3}`,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {comment.content}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
          <Box textAlign="right">
            <TextButton
              sx={{ paddingX: 0 }}
              onClick={() => navigate(`/bingo/${bingo.code}`)}
            >
              자세히 보기
            </TextButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BingoFeedItem;
