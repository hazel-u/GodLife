import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import dayjs from "dayjs";

import React, { useEffect, useRef, useState } from "react";

import BackgroundImage from "../../assets/images/bingoCell.svg";
import { ReactComponent as Stamp } from "../../assets/images/stamp.svg";
import { selectBingo } from "../../store/bingo";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";

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
  const { startDate, userEmail } = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (
      email === userEmail &&
      dayjs().format("YYYY-M-D") === startDate.join("-")
    ) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    customClickEvent();
    setOpen(false);
  };

  const cell = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(160);

  const getCellSize = () => {
    cell.current && setCellSize(cell.current.clientWidth);
  };

  useEffect(() => {
    cell.current && setCellSize(cell.current.clientWidth);
    window.addEventListener("resize", getCellSize);
  }, []);

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
          <Button onClick={handleComplete}>확인</Button>
        </DialogActions>
      </Dialog>

      <Grid
        item
        xs={4}
        onClick={handleClickOpen}
        sx={{
          position: "relative",
          width: 120,
          cursor: "pointer",
          "&::before": {
            display: "block",
            content: "''",
            paddingBottom: "100%",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            padding: cellSize < 85 ? 1 : 3,
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
          }}
          ref={cell}
        >
          {isCompleted && (
            <Stamp style={{ position: "absolute", height: "100%" }} />
          )}
          <Typography
            align="center"
            sx={{
              fontSize: cellSize / 10,
              wordBreak: "keep-all",
            }}
          >
            {content}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default BingoCell;
