import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";
import BingoFeedAllUserSearch from "./BingoFeedAllUserSearch";
import BingoFeedDateSearch from "./BingoFeedDateSearch";
import BingoFeedItem from "./BingoFeedItem";

const BingoFeed = () => {
  const isAuth = localStorage.getItem("token");
  const location = useLocation();
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);

  const dispatch = useAppDispatch();
  const getBingoFeed = () => {
    dispatch(setLoading(true));
    let request;
    if (location.pathname === "/feed" && isAuth) {
      request = axiosWithToken.get(`feed`).then((res) => {
        setBingoList(res.data);
        setBingoCount(res.data.length);
      });
    } else {
      request = axios.get(`feed/main`).then((res) => {
        setBingoList(res.data.reverse());
        setBingoCount(res.data.length);
      });
    }
    request
      .then(() => {
        dispatch(setLoading(false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (bingoCount === -1) {
      getBingoFeed();
    }
  });

  return (
    <Stack justifyContent="center" alignItems="center">
      {isAuth && (
        <Stack
          direction="row"
          justifyContent="end"
          margin="0 0 0 auto"
          padding={1}
        >
          <BingoFeedDateSearch setBingoList={setBingoList} />
          <BingoFeedAllUserSearch />
        </Stack>
      )}

      {-1 < bingoCount && bingoList.length === 0 ? (
        <>
          <Box textAlign={"center"} margin={"20%"}>
            <img src={Stamp} alt="stamp" />
            <Typography paddingY={5}>
              {isAuth &&
                bingoCount === 0 &&
                "다른 갓생러들을 팔로우하고 갓생 피드를 채워보세요."}
              {isAuth &&
                bingoCount !== 0 &&
                "찾으시는 갓생이 존재하지 않습니다.."}
              {!isAuth &&
                bingoCount === 0 &&
                "모두의 갓생이 존재하지 않습니다."}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {bingoList.map((bingo) => (
            <BingoFeedItem
              bingo={bingo}
              getBingoFeed={getBingoFeed}
              key={bingo.id}
            />
          ))}
        </>
      )}
    </Stack>
  );
};

export default BingoFeed;
