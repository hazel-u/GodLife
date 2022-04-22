import { Box, Button, Container, Stack } from "@mui/material";
import axios from "axios";

import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Bingo from "../../../components/common/Bingo/Bingo";
import CommentList from "./CommentList";
import Share from "./Share";

const GodlifeShare = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    axios.get(`bingo/${params.bingoId}`).then((res) => console.log(res));
  }, []);

  const exampleBingo = [
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
    {
      content: "일이삼사오",
      isCompleted: false,
    },
  ];

  return (
    <Stack direction="column" alignItems="center">
      <Container sx={{ width: "500px" }}>
        <Bingo
          title={"도와주세요!! 개발자가 갇혀있어요!"}
          createdBy={"백우민"}
          size={3}
          goals={exampleBingo}
          mode={"Active"}
          date={new Date()}
          streak={1}
          totalUses={1}
        />
      </Container>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "500px" }}
      >
        <Box>
          <span>👍 20</span>
          <span>🧡 11</span>
        </Box>
        <Button>빙고판 복사</Button>
      </Stack>
      <Share />
      <CommentList />
    </Stack>
  );
};

export default GodlifeShare;
