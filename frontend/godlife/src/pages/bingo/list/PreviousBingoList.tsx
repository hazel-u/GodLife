import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

import Bingo from "../../../components/Bingo/Bingo";
import { BingoType } from "../../../types/bingo";

const PreviousBingoList = () => {
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(0);
  const [page, setPage] = useState(0);

  const limit = 6;

  const getBingoList = () => {
    axios
      .get(`bingo/${page}/${limit}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
        setBingoList(res.data);
      })
      .catch((err) => console.log(err));
  };

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
  }, []);

  useEffect(() => {
    getBingoList();
  }, [page]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: "80vh" }}
      >
        {!bingoList.length ? (
          <>
            <Box
              sx={{ width: "50vh", height: "50vh", backgroundColor: "beige" }}
            >
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
                <Grid item xs={12} sm={6} md={4} key={bingo.id}>
                  <Box sx={{ maxWidth: "300px", margin: "auto" }}>
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
    </>
  );
};

export default PreviousBingoList;
