import { Box, Stack } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Bingo from "../../../components/Bingo/Bingo";
import { selectBingo, setBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/user";
import BingoTitle from "./BingoTitle";
import CommentList from "./CommentList";
import Interaction from "./Interaction";
import Share from "./Share";

const GodlifeShare = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getBingo = useCallback(() => {
    axios
      .get(`bingo/${params.bingoId}`)
      .then((res) => {
        dispatch(setBingo(res.data));
      })
      .catch(() => {
        navigate("/404");
      });
  }, [params, dispatch, navigate]);

  useEffect(() => {
    getBingo();
  }, [getBingo]);

  const bingo = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);

  return (
    <Stack direction="column" alignItems="center" m={5}>
      {bingo.code && (
        <Box sx={{ width: "500px" }}>
          {/* 본인의 bingo일 경우에만 실제 id 넘겨주고 그렇지 않다면 빈 문자열 넘기기*/}
          <BingoTitle
            id={bingo.userEmail === email ? bingo.id : ""}
            title={bingo.title}
            getBingo={getBingo}
          />
          <Bingo
            createdBy={bingo.userName}
            size={3}
            goals={bingo.goals}
            mode={"Active"}
            startDate={bingo.startDate}
            getBingo={getBingo}
            godlife={bingo.godlife}
            id={bingo.id}
          />
        </Box>
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
