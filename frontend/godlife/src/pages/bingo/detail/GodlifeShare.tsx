import { Container, Stack } from "@mui/material";
import axios from "axios";

import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Bingo from "../../../components/common/Bingo/Bingo";
import { setBingo } from "../../../store/bingo";
import { useAppDispatch } from "../../../store/hooks";
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
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur placeat, nisi incidunt, deleniti commodi esse porro iusto voluptates id, tempora vel unde accusamus? Quasi nulla ipsa aspernatur nesciunt aperiam adipisci!",
        nickname: "일이삼사오육칠팔",
        password: "string",
        seq: "string",
      },
      {
        content:
          "Tenetur placeat, nisi incidunt, deleniti commodi esse porro iusto voluptates id, tempora vel unde accusamus? Quasi nulla ipsa aspernatur nesciunt aperiam adipisci!",
        nickname: "qwer1234",
        password: "string",
        seq: "string",
      },
    ],
    godlife: true,
    id: "string",
    likeCnt: 0,
    startDate: "string",
    title: "string",
    userEmail: "qwe@qwe.cm",
  };

  useEffect(() => {
    getBingo();
  }, []);

  const dispatch = useAppDispatch();
  const getBingo = () => {
    // axios.get(`bingo/${params.bingoId}`).then((res) => console.log(res));
    dispatch(setBingo(dummyBingo));
  };

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

  const create = () => {
    axios
      .post(
        "bingo",
        { goals: [0, 1, 2, 3, 4, 5, 6, 7, 8], title: "string" },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Stack direction="column" alignItems="center">
      <Container sx={{ width: "500px" }}>
        <Bingo
          title={dummyBingo.title}
          createdBy={"백우민"}
          size={3}
          goals={exampleBingo}
          mode={"Active"}
          date={new Date()}
          streak={1}
          totalUses={1}
        />
      </Container>

      <Interaction
        code={dummyBingo.code}
        likeCnt={dummyBingo.likeCnt}
        seq={dummyBingo.id}
        getBingo={getBingo}
      />
      <button onClick={create}>임시 빙고 만들기 버튼</button>
      <Share />
      <CommentList comments={dummyBingo.comments} getBingo={getBingo} />
    </Stack>
  );
};

export default GodlifeShare;
