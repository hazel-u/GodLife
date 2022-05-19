import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import React from "react";

import { clearDialog, selectDialog } from "../../store/dialog";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TextButton } from "./Button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommonDialog = () => {
  const { open, title, content } = useAppSelector(selectDialog);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearDialog());
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText whiteSpace={"pre-line"}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <TextButton onClick={handleClose} autoFocus>
          확인
        </TextButton>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
