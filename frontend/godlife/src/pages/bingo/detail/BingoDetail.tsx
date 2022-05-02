import { Box, Stack } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BorderImage from "../../../assets/images/border.webp";
import Bingo from "../../../components/Bingo/Bingo";
import { selectBingo, setBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { selectUser } from "../../../store/user";
import BingoDetailCommentList from "./BingoDetailCommentList";
import BingoDetailInteraction from "./BingoDetailInteraction";
import BingoDetailShare from "./BingoDetailShare";
import BingoDetailTitle from "./BingoDetailTitle";

const BingoDetail = () => {
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
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [params, dispatch, navigate]);

  useEffect(() => {
    dispatch(setLoading(true));
    getBingo();
  }, [getBingo, dispatch]);

  const bingo = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);

  return (
    <Stack
      alignItems="center"
      sx={{
        margin: "3% auto",
        maxWidth: "700px",
        width: "100%",
        backgroundColor: "white",
        border: "36px solid white",
        borderImageSource: `url(${BorderImage})`,
        borderImageSlice: "37 51 47 47",
        borderImageWidth: "14px 13px 14px 13px",
        borderImageOutset: "13px 13px 13px 11px",
        borderImageRepeat: "repeat repeat",
      }}
    >
      {bingo.code && (
        <>
          {/* 본인의 bingo일 경우에만 실제 id 넘겨주고 그렇지 않다면 빈 문자열 넘기기*/}
          <BingoDetailTitle
            id={bingo.userEmail === email ? bingo.id : ""}
            title={bingo.title}
            getBingo={getBingo}
          />

          <Box sx={{ marginTop: "5%", width: "100%", maxWidth: "550px" }}>
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

            <BingoDetailInteraction
              code={bingo.code}
              likeCnt={bingo.likeCnt}
              seq={bingo.id}
              getBingo={getBingo}
            />
          </Box>

          <BingoDetailShare />
          <BingoDetailCommentList getBingo={getBingo} />
        </>
      )}
    </Stack>
  );
};

export default BingoDetail;
