import { Container, Stack } from "@mui/material";
import axios from "axios";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Bingo from "../../../components/common/Bingo/Bingo";
import { selectBingo, setBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/user";
import BingoTitle from "./BingoTitle";
import CommentList from "./CommentList";
import Interaction from "./Interaction";
import Share from "./Share";

const GodlifeShare = () => {
  const params = useParams();

  useEffect(() => {
    getBingo();
  }, []);

  const dispatch = useAppDispatch();
  const getBingo = () => {
    axios.get(`bingo/${params.bingoId}`).then((res) => {
      dispatch(setBingo(res.data));
    });
  };

  const bingo = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);

  // const isValidRequest = () => {
  //   if (bingo.userEmail !== email) {
  //     return false;
  //   // } else if (bingo.startDate !== new Date()) {
  //     // return false;
  //   // }
  //   return true;
  // };

  return (
    <Stack direction="column" alignItems="center">
      {bingo.code && (
        <Container sx={{ width: "500px" }}>
          {/* 
          본인의 bingo일 경우에만 실제 id 넘겨주고 
          그렇지 않다면 "" 빈 문자열 넘기기
         */}
          <BingoTitle
            id={bingo.userEmail === email ? bingo.id : ""}
            title={bingo.title}
            getBingo={getBingo}
          />
          <Bingo
            createdBy={"백우민"}
            size={3}
            goals={bingo.goals}
            mode={"Active"}
            startDate={new Date()}
          />
        </Container>
      )}

      <Interaction
        code={bingo.code}
        likeCnt={bingo.likeCnt}
        seq={bingo.id}
        getBingo={getBingo}
      />

      <Share />
      <CommentList getBingo={getBingo} />
    </Stack>
  );
};

export default GodlifeShare;
