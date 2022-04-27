import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import React, { useState } from "react";

import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";

const BingoTitle = ({
  id,
  title,
  getBingo,
}: {
  id: string;
  title: string;
  getBingo: () => void;
}) => {
  const [newTitle, setNewTitle] = useState(title);

  const [clickEdit, setClickEdit] = useState(false);

  const dispatch = useAppDispatch();
  const edit = () => {
    if (clickEdit) {
      axios
        .put(
          `bingo/${id}`,
          { title: newTitle },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => getBingo())
        .catch(() =>
          dispatch(
            setSnackbar({
              open: true,
              message: "다시 시도해주세요.",
              severity: "error",
            })
          )
        );
      setClickEdit((prevState) => !prevState);
    } else {
      setClickEdit((prevState) => !prevState);
    }
  };

  const { startDate, godCount } = useAppSelector(selectBingo);

  return (
    <Box
      sx={{
        "& p": {
          fontFamily: "BMEULJIRO",
          textAlign: "center",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "65px" }}
      >
        {clickEdit ? (
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 25,
              style: {
                textAlign: "center",
              },
            }}
            InputProps={{
              style: {
                width: `${newTitle.length * 36}px`,
                maxWidth: "100%",
                fontFamily: "BMEULJIRO",
                fontSize: "36px",
                minWidth: "36px",
              },
            }}
            autoFocus={true}
            sx={{
              "& .MuiInput-root": {
                fontSize: "24px",
                "& fieldset": {
                  border: "solid 1px #C4C4C4",
                },
                "&:hover fieldset": {
                  border: "solid 1px #C4C4C4",
                },
                "&.Mui-focused fieldset": {
                  border: "solid 1px #C4C4C4",
                },
                "&.Mui-disabled fieldset": {
                  border: "solid 1px #C4C4C4",
                },
              },
              "& .MuiInput-root:before": {
                borderBottom: "2px solid #B3B3B3",
              },
            }}
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                edit();
              }
            }}
          />
        ) : (
          <Typography sx={{ fontSize: 36, width: `${title.length * 36}px` }}>
            {title}
          </Typography>
        )}
        {id && (
          <Box>
            <IconButton onClick={edit}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Stack>
      <p>제목 글자수로 input 너비를 정해져 고정폭 글씨체를 쓰는게 좋다</p>
      {dayjs().format("YYYY-M-D") === startDate.join("-") && (
        <Box sx={{ mt: 2 }}>
          <Typography>
            {godCount}일 째 갓생 중 | {100}일 연속 갓생 중
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BingoTitle;
