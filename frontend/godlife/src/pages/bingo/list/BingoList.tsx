import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BorderImage from "../../../assets/images/border.webp";
import Stamp from "../../../assets/images/stamp.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";

const BingoList = () => {
  const location = useLocation();
  const params = useParams();
  const initialPage =
    params.page && Number.isInteger(params.page)
      ? parseInt(params.page) - 1
      : 0;

  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);
  const [page, setPage] = useState(initialPage);

  const limit = 6;
  const dispatch = useAppDispatch();
  const getBingoList = useCallback(() => {
    axiosWithToken
      .get(`bingo/${page}/${limit}`)
      .then((res) => {
        setBingoList(res.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    dispatch(setLoading(true));
    axiosWithToken
      .get("bingo/count")
      .then((res) => {
        setBingoCount(res.data.count);
        if (
          res.data.count &&
          -1 < page &&
          page <= Math.floor((bingoCount + limit - 1) / limit)
        ) {
          getBingoList();
        }
      })
      .catch((err) => console.log(err));
  }, [getBingoList, dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    getBingoList();
  }, [page, getBingoList, dispatch]);

  useEffect(() => {
    if (-1 < bingoCount) {
      dispatch(setLoading(false));
    }
  }, [bingoList, dispatch, bingoCount]);

  const navigate = useNavigate();

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" p={3}>
      {bingoCount === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ minHeight: "500px" }}
        >
          <Box textAlign={"center"} m={3}>
            <img src={Stamp} alt="stamp" />
          </Box>
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
                onClick={() =>
                  navigate(`/bingo/${bingo.code}`, { state: { page } })
                }
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
                    borderImageSlice: "37 51 47 47",
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
                    marginY={1}
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

export default BingoList;
