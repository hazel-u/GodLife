import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";

interface BingoCellProp {
  content: String;
  isCompleted: boolean;
  customClickEvent: () => void;
}

const BingoCell = ({
  content,
  isCompleted,
  customClickEvent,
}: BingoCellProp) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    customClickEvent();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{content}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCompleted
              ? "목표 달성을 취소하시겠습니까?"
              : "목표를 완료하시겠습니까?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleComplete} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        item
        xs={4}
        onClick={handleClickOpen}
        sx={{
          position: "relative",
          width: 120,
          "&::before": {
            display: "block",
            content: "''",
            paddingBottom: "100%",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: isCompleted ? "primary.dark" : "primary.light",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            padding: 1,
          }}
        >
          <Typography align="center">{content}</Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default BingoCell;
