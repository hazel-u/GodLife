import { Box, Divider, Stack } from "@mui/material";
import axios from "axios";

import React from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { CommentType } from "../../../types/comment";
import Comment from "./Comment";

const CommentList = ({
  comments,
  getBingo,
}: {
  comments: CommentType[];
  getBingo: () => void;
}) => {
  const [newComment, setNewComment] = React.useState({
    nickname: "",
    content: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selectBingo);

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
    <Box sx={{ maxWidth: "500px", margin: "30px" }}>
      <p>댓글 {comments.length}개</p>
      <Divider />
      {comments.map((comment: any, index: number) => (
        <>
          <Comment comment={comment} />
          {index !== comments.length - 1 && <Divider />}
        </>
      ))}
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ margin: "10px 0" }}>
          <OutlinedInput
            placeholder="닉네임"
            size="small"
            value={newComment.nickname}
            onChange={(e) => {
              setNewComment({ ...newComment, nickname: e.target.value });
            }}
          />
          <OutlinedInput
            placeholder="비밀번호"
            size="small"
            value={newComment.password}
            type="password"
            onChange={(e) => {
              setNewComment({ ...newComment, password: e.target.value });
            }}
          />
          <OutlinedButton variant="outlined" type="submit">
            작성
          </OutlinedButton>
        </Stack>
        <OutlinedInput
          placeholder="내용"
          value={newComment.content}
          sx={{ width: "100%", maxWidth: "500px" }}
          onChange={(e) => {
            setNewComment({ ...newComment, content: e.target.value });
          }}
        />
      </form>
    </Box>
  );
};

export default CommentList;
