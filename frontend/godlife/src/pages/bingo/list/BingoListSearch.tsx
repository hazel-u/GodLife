import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import React from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedInput } from "../../../components/common/Input";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const BingoListSearch = () => {
  dayjs.extend(isBetween);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (newValue: Date | null) => {
    console.log(
      newValue,
      dayjs(newValue).isValid(),
      dayjs(newValue).isBetween(
        dayjs("2022-05-01"),
        dayjs("2999-12-31"),
        "year",
        "[]"
      )
    );
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
      .get(`bingo/date/${dayjs(newValue).format("YYYY-MM-DD")}`)
      .then((res) => {
        navigate(`/bingo/${res.data.code}`, { state: { page: 0 } });
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
    <OutlinedInput
      placeholder="날짜로 이동"
      id="date"
      type="text"
      sx={{ width: 200 }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.valueAsDate)
      }
      onFocus={() =>
        document.getElementById("date")?.setAttribute("type", "date")
      }
      InputProps={{ inputProps: { min: "2022-05-01", max: "2999-12-31" } }}
    />
  );
};

export default BingoListSearch;
