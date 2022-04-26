import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/user";
import { CommentType } from "../../../types/comment";

const Comment = ({ comment }: { comment: CommentType }) => {
  const { userEmail } = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);
  const [open, setOpen] = React.useState(false);

  // 비밀번호 input 수동 autofocus
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    passwordInput.current && passwordInput.current.focus();
  }, [refVisible]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>
          {userEmail === email ? (
            <DialogContentText>댓글을 삭제하시겠습니까?</DialogContentText>
          ) : (
            <>
              <DialogContentText>비밀번호를 입력해주세요.</DialogContentText>
              <OutlinedInput
                inputRef={(el) => {
                  passwordInput.current = el;
                  setRefVisible(!!el);
                }}
                autoFocus={true}
                size="small"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <OutlinedButton
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </OutlinedButton>
          <OutlinedButton
            onClick={() => {
              setOpen(false);
            }}
          >
            확인
          </OutlinedButton>
        </DialogActions>
      </Dialog>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>{comment.nickname}</p>
        <Box>
          <IconButton onClick={() => setOpen(true)}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Stack>
      <Typography sx={{ margin: "0 0 30px 0" }}>{comment.content}</Typography>
    </>
  );
};

export default Comment;
