import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

import React, { useState } from "react";

import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const BingoDetailTitle = ({
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

  const { startDate, godCount, serialGodCount, userName } =
    useAppSelector(selectBingo);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        "& p": {
          textAlign: "center",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          fontFamily="BMEULJIRO"
          fontSize={fullScreen ? "16px" : "24px"}
        >
          {startDate[0]}년 {startDate[1]}월 {startDate[2]}일
        </Typography>
        <Typography
          fontFamily="BMEULJIRO"
          fontSize={fullScreen ? "16px" : "24px"}
        >
          {userName}의 갓생
        </Typography>
      </Stack>

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
        marginTop={3}
      >
        {id && <Box sx={{ width: "40px" }} />}
        {clickEdit ? (
          <TextField
            variant="standard"
            type="text"
            inputProps={{
              maxLength: 10,
              style: {
                textAlign: "center",
              },
            }}
            InputProps={{
              style: {
                width: `${
                  fullScreen ? newTitle.length * 24 : newTitle.length * 32
                }px`,
                maxWidth: "100%",
                fontFamily: "BMEULJIRO",
                fontSize: "32px",
                minWidth: "32px",
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
          <Typography
            sx={{
              fontSize: fullScreen ? 24 : 32,
              width: `${fullScreen ? title.length * 24 : title.length * 32}px`,
            }}
          >
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
            <span style={{ color: "#A11803" }}>{godCount}일째</span> 갓생 달성
            중
          </Typography>
          <Typography>
            <span style={{ color: "#A11803" }}>{serialGodCount}일 연속</span>{" "}
            갓생 달성 중
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BingoDetailTitle;
