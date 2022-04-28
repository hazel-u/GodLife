import { Box, Divider, Stack } from "@mui/material";
import axios from "axios";

import React from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import Comment from "./Comment";

const CommentList = ({ getBingo }: { getBingo: () => void }) => {
  const [newComment, setNewComment] = React.useState({
    nickname: "",
    content: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { id, comments } = useAppSelector(selectBingo);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { nickname, content, password } = { ...newComment };
    if (nickname && content && password) {
      axios
        .post(`bingo/${id}/comment`, newComment, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        })
        .then(() => {
          dispatch(
            setSnackbar({
              open: true,
              message: "댓글이 작성되었습니다.",
              severity: "success",
            })
          );
          setNewComment({
            nickname: "",
            content: "",
            password: "",
          });
          getBingo();
        })
        .catch(() => {
          dispatch(
            setSnackbar({
              open: true,
              message: "다시 시도해주세요.",
              severity: "error",
            })
          );
        });
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: "닉네임과 비밀번호, 내용을 모두 입력해주세요.",
          severity: "warning",
        })
      );
    }
  };

  return (
    <Box sx={{ maxWidth: "500px", margin: "3% 0", width: "100%" }}>
      <p>댓글 {comments.length}개</p>
      <Divider />
      {!comments.length && <p>댓글이 없습니다.</p>}
      {comments
        .slice()
        .sort(function (a, b) {
          for (let i = 0; i < a.date.length; i++) {
            if (a.date[i] !== b.date[i]) {
              return a.date[i] - b.date[i];
            }
          }
          return 0;
        })
        .map((comment: any, index: number) => (
          <React.Fragment key={index}>
            <Comment comment={comment} getBingo={getBingo} />
            {index !== comments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <OutlinedInput
              placeholder="닉네임"
              size="small"
              value={newComment.nickname}
              onChange={(e) => {
                setNewComment({ ...newComment, nickname: e.target.value });
              }}
              sx={{ maxWidth: "150px" }}
            />
            <OutlinedInput
              placeholder="비밀번호"
              size="small"
              value={newComment.password}
              type="password"
              onChange={(e) => {
                setNewComment({ ...newComment, password: e.target.value });
              }}
              sx={{ maxWidth: "150px" }}
            />
          </Stack>

          <OutlinedInput
            placeholder="내용"
            value={newComment.content}
            sx={{ width: "100%", maxWidth: "500px" }}
            onChange={(e) => {
              setNewComment({ ...newComment, content: e.target.value });
            }}
          />

          <Box sx={{ textAlign: "end" }}>
            <OutlinedButton
              variant="outlined"
              type="submit"
              sx={{ width: "50px", height: "39.99px" }}
            >
              작성
            </OutlinedButton>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default CommentList;
