import { Container, Stack } from "@mui/material";
import axios from "axios";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Bingo from "../../../components/common/Bingo/Bingo";
import { selectBingo, setBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
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

  return (
    <Stack direction="column" alignItems="center">
      {bingo.code && (
        <Container sx={{ width: "500px" }}>
          <Bingo
            createdBy={"백우민"}
            size={3}
            goals={bingo.goals}
            mode={"Active"}
            date={new Date()}
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
