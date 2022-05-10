import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";
import BingoListItem from "./BingoListItem";
import BingoListSearch from "./BingoListSearch";

const BingoList = () => {
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
  }, [getBingoList, dispatch, bingoCount, page]);

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
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingX={3}
    >
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
            <Grid item xs={12}>
              <BingoListSearch />
            </Grid>
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
                <BingoListItem bingo={bingo} />
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
