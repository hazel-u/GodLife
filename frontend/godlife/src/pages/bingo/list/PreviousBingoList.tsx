import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BorderImage from "../../../assets/images/border.svg";
import BingoJson from "../../../assets/json/bingo.json";
import Bingo from "../../../components/Bingo/Bingo";
import Lottie from "../../../components/common/Lottie";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";

const PreviousBingoList = () => {
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);
  const [page, setPage] = useState(0);

  const limit = 6;
  const dispatch = useAppDispatch();
  const getBingoList = useCallback(() => {
    dispatch(setLoading(true));
    axiosWithToken
      .get(`bingo/${page}/${limit}`)
      .then((res) => {
        setBingoList(res.data);
      })
      .catch((err) => console.log(err));
  }, [page, dispatch]);

  useEffect(() => {
    axiosWithToken
      .get("bingo/count")
      .then((res) => {
        setBingoCount(res.data.count);
        getBingoList();
      })
      .catch((err) => console.log(err));
  }, [getBingoList]);

  useEffect(() => {
    getBingoList();
  }, [page, getBingoList]);

  useEffect(() => {
    dispatch(setLoading(false));
  }, [bingoList, dispatch]);

  const navigate = useNavigate();

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" p={3}>
      {bingoCount === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ minHeight: "500px" }}
        >
          <Lottie animationData={BingoJson} width={200} height={200} />
          <Typography>아직 생성된 갓생이 없습니다.</Typography>
        </Stack>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            sx={{ maxWidth: "1000px", padding: "40px 0" }}
          >
            {bingoList.map((bingo) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={bingo.id}
                onClick={() => navigate(`/bingo/${bingo.code}`)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    border: "20px solid white",
                    borderImageSource: `url(${BorderImage})`,
                    borderImageSlice: "50 104 39 103",
                    borderImageWidth: "14px 20px 14px 13px",
                    borderImageOutset: "13px 13px 13px 11px",
                    borderImageRepeat: "repeat repeat",
                  }}
                >
                  <Typography fontSize={12}>
                    {bingo.startDate[0]}년 {bingo.startDate[1]}월{" "}
                    {bingo.startDate[2]}일의 갓생
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    fontFamily={"BMEULJIRO"}
                    fontSize={16}
                    mt={1}
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
            ))}
          </Grid>
          <Pagination
            count={Math.floor((bingoCount + limit - 1) / limit)}
            page={page + 1}
            sx={{ padding: "50px" }}
            onChange={(_, value: number) => setPage(value - 1)}
          />
        </>
      )}
    </Stack>
  );
};

export default PreviousBingoList;
