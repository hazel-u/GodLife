import { Container, Stack } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Bingo from "../../../components/common/Bingo/Bingo";
import CommentList from "./CommentList";
import Interaction from "./Interaction";
import Share from "./Share";

const GodlifeShare = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  const dummyBingo = {
    activate: true,
    code: 0,
    commentCnt: 0,
    comments: [
      {
        bingo: {
          activate: true,
          bingoCode: {
            code: 0,
          },
          comments: [null],
          godlife: true,
          heartCnt: 0,
          likeCnt: 0,
          seq: "string",
          startDate: "string",
          surpriseCnt: 0,
          title: "string",
          user: {
            deleted: true,
            email: "string",
            godCount: 0,
            name: "string",
            oauth_type: "NATIVE",
            password: "string",
            recentDate: "string",
            seq: 0,
          },
        },
        content: "string",
        nickname: "string",
        password: "string",
        seq: "string",
      },
    ],
    godlife: true,
    id: "string",
    likeCnt: 0,
    startDate: "string",
    title: "string",
    userEmail: "string",
  };

  const [bingo, setBingo] = useState(dummyBingo);

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
          title={bingo.title}
          createdBy={"백우민"}
          size={3}
          goals={exampleBingo}
          mode={"Active"}
          date={new Date()}
          streak={1}
          totalUses={1}
        />
      </Container>

      <Interaction code={bingo.code} likeCnt={bingo.likeCnt} seq={bingo.id} />
      <Share />
      <CommentList />
    </Stack>
  );
};

export default GodlifeShare;
