import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

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
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);

  const dispatch = useAppDispatch();

  const getMainBingoFeed = () => {
    axios.get(`feed/main`).then((res) => {
      setBingoList(res.data.reverse());
      setBingoCount(res.data.length);
      dispatch(setLoading(false));
    });
  };

  const getBingoFeed = () => {
    axiosWithToken.get(`feed`).then((res) => {
      if (res.data.length) {
        setBingoList(res.data);
        setBingoCount(res.data.length);
        dispatch(setLoading(false));
      } else {
        getMainBingoFeed();
      }
    });
  };

  useEffect(() => {
    if (bingoCount === -1 && isAuth) {
      dispatch(setLoading(true));
      getBingoFeed();
    } else if (bingoCount === -1 && !isAuth) {
      dispatch(setLoading(true));
      getMainBingoFeed();
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
