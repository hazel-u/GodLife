import { Box, Grid } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

import Bingo from "../../../components/common/Bingo/Bingo";
import { BingoType } from "../../../types/bingo";

const PreviousBingoList = () => {
  const [bingoList, setBingoList] = useState<BingoType[]>([]);

  const page = 0;
  const limit = 6;
  useEffect(() => {
    axios
      .get(`bingo/${page}/${limit}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setBingoList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={4} sx={{ padding: "30px" }}>
      {bingoList.map((bingo) => (
        <Grid item xs={12} sm={6} md={4} key={bingo.id}>
          <Box sx={{ maxWidth: "300px", margin: "auto" }}>
            <Bingo
              createdBy={"백우민"}
              size={3}
              goals={bingo.goals}
              mode={"Active"}
              date={new Date()}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PreviousBingoList;
