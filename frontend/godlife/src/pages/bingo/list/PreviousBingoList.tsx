import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Bingo from "../../../components/Bingo/Bingo";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";

const PreviousBingoList = () => {
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);
  const [page, setPage] = useState(0);

  const limit = 6;
  const dispatch = useAppDispatch();
  const getBingoList = useCallback(() => {
    dispatch(setLoading(true));
    axios
      .get(`bingo/${page}/${limit}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setBingoList(res.data);
      })
      .catch((err) => console.log(err));
  }, [page, dispatch]);

  useEffect(() => {
    axios
      .get("bingo/count", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
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
        <>
          <Box sx={{ width: "50vh", height: "50vh", backgroundColor: "beige" }}>
            빙고가 없다는걸 알려주는 이미지
          </Box>
          <Typography>아직 생성된 빙고가 없습니다.</Typography>
        </>
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
                sx={{ cursor: "pointer" }}
              >
                <p>{bingo.startDate.join("-")}</p>
                <Bingo
                  createdBy={bingo.userName}
                  size={3}
                  goals={bingo.goals}
                  mode={"Active"}
                  startDate={bingo.startDate}
                  godlife={bingo.godlife}
                />
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
