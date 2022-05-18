import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "flatpickr/dist/themes/light.css";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";

const BingoFeedDateSearch = ({
  setBingoList,
}: {
  setBingoList: React.Dispatch<React.SetStateAction<BingoType[]>>;
}) => {
  dayjs.extend(isBetween);
  const dispatch = useAppDispatch();

  const handleChange = (newValue: Date) => {
    if (
      !dayjs(newValue).isValid() ||
      !dayjs(newValue).isBetween(
        dayjs("2022-05-01"),
        dayjs("2999-12-31"),
        "year",
        "[]"
      )
    )
      return;

    axiosWithToken
      .get(`feed/search/date/${dayjs(newValue).format("YYYY-MM-DD")}`)
      .then((res) => {
        setBingoList(res.data);
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            open: true,
            message: "선택하신 날짜의 갓생이 없습니다.",
            severity: "warning",
          })
        );
      });
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ fontFamily: "BMEULJIRO", fontSize: 24 }}>
          날짜로 검색
        </DialogTitle>
        <DialogContent sx={{ margin: "0 20px 20px 20px", height: "330px" }}>
          <Box width="300px">
            <Calendar
              onChange={(newDate: Date) => {
                handleChange(newDate);
                setOpen(false);
              }}
              calendarType="Hebrew"
              className="feed-date-search"
              formatDay={(locale, date) => `${date.getDate()}`}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <button onClick={() => setOpen(true)} className="feed-user-search">
        <Stack direction="row" alignItems="center" justifyContent="start">
          <CalendarMonthIcon sx={{ marginRight: "5px" }} />
          날짜로 검색
        </Stack>
      </button>
    </>
  );
};

export default BingoFeedDateSearch;
