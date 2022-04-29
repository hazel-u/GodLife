import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

import React, { useEffect, useState } from "react";

import useCountDown from "../../../hooks/useCountDown";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { selectUser } from "../../../store/user";
import axiosWithToken from "../../../utils/axios";

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
      axiosWithToken
        .put(`bingo/${id}`, { title: newTitle })
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

  const { startDate, godCount, serialGodCount, userEmail } =
    useAppSelector(selectBingo);
  const { email, name } = useAppSelector(selectUser);

  const countDown = useCountDown();
  const [leftHours, setLeftHours] = useState<number>();
  const [leftMinutes, setLeftMinutes] = useState<number>();
  useEffect(() => {
    setLeftHours(
      Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    setLeftMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)));
  }, [countDown]);

  return (
    <Box
      sx={{
        "& p": {
          textAlign: "center",
        },
      }}
    >
      <Typography>
        {startDate[0]}년 {startDate[1]}월 {startDate[2]}일 {name}의 갓생
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "65px",
          "& p": {
            fontFamily: "BMEULJIRO",
          },
        }}
      >
        {id && <Box sx={{ width: "40px" }} />}
        {clickEdit ? (
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 10,
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

      {dayjs().format("YYYY-M-D") === startDate.join("-") && (
        <Box>
          <Typography>
            {godCount}일째 갓생 달성 중 | {serialGodCount}일 연속 갓생 달성 중
          </Typography>
          {userEmail === email && (
            <Typography>
              종료까지 {leftHours && leftHours < 10 && "0"}
              {leftHours}시간 {leftMinutes && leftMinutes < 10 && "0"}
              {leftMinutes}분
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BingoTitle;
