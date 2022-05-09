import { Box, Stack } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Bingo from "../../../components/Bingo/Bingo";
import { OutlinedButton } from "../../../components/common/Button";
import { selectBingo, setBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { selectUser } from "../../../store/user";
import BingoDetailCommentList from "./BingoDetailCommentList";
import BingoDetailCopy from "./BingoDetailCopy";
import BingoDetailLike from "./BingoDetailLike";
import BingoDetailShare from "./BingoDetailShare";
import BingoDetailTitle from "./BingoDetailTitle";

const BingoDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { page: number };

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
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
        padding: "10%",
      }}
    >
      {bingo.code && (
        <>
          <Box
            sx={{ width: "100%", maxWidth: "800px", backgroundColor: "white" }}
            id="bingo"
          >
            {/* 본인의 bingo일 경우에만 실제 id 넘겨주고 그렇지 않다면 빈 문자열 넘기기*/}
            <BingoDetailTitle
              id={bingo.userEmail === email ? bingo.id : ""}
              title={bingo.title}
              getBingo={getBingo}
            />

            <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
              <Bingo
                createdBy={bingo.userName}
                size={3}
                goals={bingo.goals}
                mode={"showProgress"}
                startDate={bingo.startDate}
                getBingo={getBingo}
                godlife={bingo.godlife}
                id={bingo.id}
              />
            </Box>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", maxWidth: "500px" }}
          >
            <BingoDetailLike
              likeCnt={bingo.likeCnt}
              seq={bingo.id}
              getBingo={getBingo}
            />
            <BingoDetailCopy code={bingo.code} />
          </Stack>

          <BingoDetailShare />
          <BingoDetailCommentList getBingo={getBingo} />
        </>
      )}

      {locationState && 0 <= locationState.page && (
        <Stack
          direction="row"
          justifyContent="start"
          sx={{ width: "100%", maxWidth: "800px" }}
        >
          <Box>
            <OutlinedButton
              variant="outlined"
              onClick={() => navigate(`/list/${locationState.page + 1}`)}
            >
              이전의 갓생 목록
            </OutlinedButton>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default BingoDetail;
