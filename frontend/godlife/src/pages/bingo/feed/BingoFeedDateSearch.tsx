import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/light.css";

import React from "react";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
        // navigate(`/bingo/${res.data.code}`, { state: { page: 0 } });
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
  return (
    <Flatpickr
      onChange={(newDate) => {
        handleChange(newDate[0]);
        console.log(newDate[0]);
      }}
      options={{
        locale: Korean,
        minDate: "2022-05-01",
        maxDate: "2999-12-31",
      }}
      className="date-picker"
      placeholder="날짜로 검색"
    />
  );
};

export default BingoFeedDateSearch;
