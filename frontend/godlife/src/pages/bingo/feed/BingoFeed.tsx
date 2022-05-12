import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { typography } from "@mui/system";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BorderImage from "../../../assets/images/border.webp";
import Stamp from "../../../assets/images/stamp.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { OutlinedInput } from "../../../components/common/Input";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";

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
    <Stack direction="column" justifyContent="center" alignItems="center" p={3}>
      <OutlinedInput
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        type="text"
      />
      <Box>
        <Typography></Typography>
      </Box>
      {bingoCount === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ minHeight: "500px" }}
        >
          <Box textAlign={"center"} m={3}>
            <img src={Stamp} alt="stamp" />
          </Box>
          <Typography>
            다른 갓생러들을 팔로우하고 갓생 피드를 채워보세요.
          </Typography>
        </Stack>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            sx={{ maxWidth: "800px", padding: "40px 0" }}
          >
            {bingoList.map((bingo) => (
              <Grid
                container
                item
                xs={12}
                key={bingo.id}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Grid
                  item
                  xs={7}
                  onClick={() => navigate(`/bingo/${bingo.code}`)}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      border: "20px solid white",
                      borderImageSource: `url(${BorderImage})`,
                      borderImageSlice: "37 51 47 47",
                      borderImageWidth: "14px 20px 14px 13px",
                      borderImageOutset: "13px 13px 13px 11px",
                      borderImageRepeat: "repeat repeat",
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
                <Grid
                  item
                  xs={4}
                  marginLeft={5}
                  sx={{
                    backgroundColor: "E3E3E3",
                  }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      border: "20px solid white",
                      borderImageSource: `url(${BorderImage})`,
                      borderImageSlice: "37 51 47 47",
                      borderImageWidth: "14px 20px 14px 13px",
                      borderImageOutset: "13px 13px 13px 11px",
                      borderImageRepeat: "repeat repeat",
                    }}
                  >
                    <Typography
                      fontFamily={"BMEULJIRO"}
                      fontSize={20}
                      marginY={1}
                    >
                      {bingo.userName} 님의 갓생
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
                      <Box>
                        <IconButton size="small">
                          <ThumbUpIcon style={{ color: "#BB9B72" }} />
                        </IconButton>
                      </Box>
                      <Typography sx={{ mt: 0.5 }}>{bingo.likeCnt}</Typography>
                      <Box>
                        <IconButton size="small">
                          <ChatBubbleIcon style={{ color: "#BB9B72" }} />
                        </IconButton>
                      </Box>
                      <Typography sx={{ mt: 0.5 }}>
                        {bingo.comments.length}
                      </Typography>
                    </Stack>
                    <hr />
                    {/* 댓글 부분 */}
                    {bingo.comments.slice(0, 3).map((comment) => (
                      <Box paddingBottom={2}>
                        <Typography fontSize={13}>
                          {comment.nickname}
                        </Typography>
                        <Typography fontSize={10}>{comment.content}</Typography>
                        <Typography></Typography>
                      </Box>
                    ))}
                    <Typography fontSize={8} align="right">
                      -자세히 보기-
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default BingoFeed;
