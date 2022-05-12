import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";
import BingoFeedDateSearch from "./BingoFeedDateSearch";
import BingoFeedSearch from "./BingoFeedSearch";

const searchUser = (nickName: string) => {
  axiosWithToken
    .post(`feed/user`, { keyword: nickName })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

const followUser = (nickName: string) => {
  console.log(nickName);
  axiosWithToken
    .post(`feed/follow/${nickName}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log("팔로우 에러", err));
};

const unfollowUser = (nickName: string) => {
  axiosWithToken
    .delete(`feed/follow/${nickName}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

const UserSearchResult = () => {
  return null;
};

const BingoFeed = () => {
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);
  // 유저 검색창
  const [searchInput, setSearchInput] = useState("");
  console.log(bingoList);

  const getBingoFeed = () => {
    axiosWithToken
      .get(`feed`)
      .then((res) => {
        setBingoList(res.data);
        setBingoCount(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (bingoCount === -1) {
      getBingoFeed();
      // followUser("월워우러");
      // searchUser("천민우");
    }
  });

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Box marginY={3}>
        <BingoFeedDateSearch setBingoList={setBingoList} />
      </Box>
      <BingoFeedSearch />
      {/* <OutlinedInput
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        type="text"
        placeholder="갓생러 검색"
      /> */}
      {/* <Box>
        <Typography></Typography>
      </Box> */}
      {bingoList.length === 0 ? (
        <>
          <Box textAlign={"center"} margin={"20%"}>
            <img src={Stamp} alt="stamp" />
            <Typography paddingY={5}>
              {bingoCount === 0
                ? "다른 갓생러들을 팔로우하고 갓생 피드를 채워보세요."
                : "해당 날짜의 갓생이 존재하지 않습니다."}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {bingoList.map((bingo) => (
            <Grid
              container
              margin={3}
              maxWidth={800}
              spacing={{ sm: 3 }}
              key={bingo.id}
            >
              <Grid
                item
                xs={12}
                sm={7}
                md={8}
                marginBottom={1}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Box
                  onClick={() => navigate(`/bingo/${bingo.code}`)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
                    padding: "20px",
                  }}
                >
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

              <Grid item xs={12} sm={5} md={4}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
                    padding: "20px",
                  }}
                >
                  <Typography fontFamily={"BMEULJIRO"}>
                    {bingo.userName}님의 갓생
                  </Typography>
                  <Typography fontSize={12}>
                    {bingo.startDate[0]}년 {bingo.startDate[1]}월{" "}
                    {bingo.startDate[2]}일
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    fontFamily={"BMEULJIRO"}
                    fontSize={20}
                    marginY={1}
                  >
                    "{bingo.title}"
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <ThumbUpIcon
                      style={{
                        color: "#464646",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <Typography>{bingo.likeCnt}</Typography>
                    <ChatBubbleIcon
                      style={{
                        color: "#464646",
                        width: "16px",
                        height: "16px",
                        marginLeft: "5px",
                      }}
                    />
                    <Typography>{bingo.comments.length}</Typography>
                  </Stack>

                  <Divider />

                  {/* 댓글 부분 */}
                  {bingo.comments.slice(0, 3).map((comment) => (
                    <Box paddingBottom={2}>
                      <Typography fontSize={13}>{comment.nickname}</Typography>
                      <Typography fontSize={10}>{comment.content}</Typography>
                      <Typography></Typography>
                    </Box>
                  ))}
                  <Box textAlign="right">
                    <span
                      style={{ cursor: "pointer", fontSize: "10px" }}
                      onClick={() => navigate(`/bingo/${bingo.code}`)}
                    >
                      더보기
                    </span>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Stack>
  );
};

export default BingoFeed;
