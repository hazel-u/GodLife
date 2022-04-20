import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Stack, Box, Button } from "@mui/material";
import Logo from "../../../assets/images/logo.svg";
import Share from "./Share";

const GodlifeShare = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    axios.get(`bingo/${params.bingoId}`).then((res) => console.log(res));
  }, []);

  return (
    <Stack direction="column" alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <img src={Logo} alt="logo" />
      </Box>
      <p>미라클모닝어쩌구</p>
      <p>3일째 갓생중 어쩌구</p>
      <Box sx={{ width: "300px", height: "300px", backgroundColor: "beige" }}>
        빙고 자리
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "300px" }}
      >
        <Box>
          <span>👍 20</span>
          <span>🧡 11</span>
        </Box>
        <Button>빙고판 복사</Button>
      </Stack>
      <Share />
    </Stack>
  );
};

export default GodlifeShare;
