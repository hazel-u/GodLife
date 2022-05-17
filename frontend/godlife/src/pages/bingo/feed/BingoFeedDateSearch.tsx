import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/light.css";

import React, { useRef } from "react";
import { default as Flatpickr } from "react-flatpickr";

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

  const fp = useRef<any>(null);

  // const clear = () => {
  //   fp.current && fp.current.flatpickr.clear();
  // };

  return (
    <>
      <Flatpickr
        onChange={(newDate) => {
          handleChange(newDate[0]);
        }}
        options={{
          locale: Korean,
          minDate: "2022-05-01",
          maxDate: "2999-12-31",
        }}
        className="feed-date-picker"
        placeholder="날짜로 검색"
        ref={fp}
      />
      {/* <button onClick={clear}>클리어</button> */}
    </>
  );
};

export default BingoFeedDateSearch;
