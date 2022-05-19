import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const BingoCopy = ({
  open,
  setOpen,
  title,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const getBingo = () => {
    axios
      .get(`bingo/${code}`)
      .then((res) => {
        const goals: number[] = res.data.goals.map(
          (goal: { goalSeq: number }) => goal.goalSeq
        );

        axiosWithToken
          .post("bingo", { goals, title })
          .then((res) => {
            navigate(`/bingo/${res.data.code}`);
            setOpen(false);
          })
          .catch(() => {
            dispatch(
              setSnackbar({
                open: true,
                message: "다시 시도해주세요.",
                severity: "error",
              })
            );
          });
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            open: true,
            message: "코드를 확인해주세요.",
            severity: "error",
          })
        );
      });
  };

  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle>갓생 복사</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <p>
          복사하려는 갓생의 코드를 입력해주세요. <br /> 일치하는 갓생과 같은
          목표를 갖는 갓생이 생성됩니다.
        </p>
        <OutlinedInput
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          type="text"
        />
      </DialogContent>

      <DialogActions>
        <OutlinedButton
          onClick={() => {
            setOpen(false);
          }}
        >
          취소
        </OutlinedButton>
        <OutlinedButton onClick={getBingo} autoFocus>
          확인
        </OutlinedButton>
      </DialogActions>
    </Dialog>
  );
};

export default BingoCopy;
