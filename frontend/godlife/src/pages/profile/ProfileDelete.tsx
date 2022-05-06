import { Box } from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../components/common/Button";
import { OutlinedInput } from "../../components/common/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { selectUser } from "../../store/user";
import axiosWithToken from "../../utils/axios";

const ProfileDelete = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteProfile = () => {
    if (name === nameInput) {
      axiosWithToken
        .delete("user")
        .then(() => {
          handleClose();
          navigate("/login");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshtoken");
          dispatch(
            setSnackbar({
              open: true,
              message: "탈퇴되었습니다.",
              severity: "success",
            })
          );
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
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: "닉네임을 확인해주세요.",
          severity: "error",
        })
      );
    }
  };

  const { name } = useAppSelector(selectUser);
  const [nameInput, setNameInput] = useState("");

  return (
    <Box maxWidth={300}>
      <h3>정말 탈퇴하시겠습니까?</h3>
      <p>탈퇴를 원하시면 닉네임을 입력해주세요.</p>
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
        <OutlinedInput
          placeholder="닉네임"
          size="small"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          sx={{ marginBottom: "20px" }}
          type="text"
        />
        <OutlinedButton
          variant="outlined"
          type="submit"
          onClick={deleteProfile}
        >
          탈퇴
        </OutlinedButton>
      </Box>
    </Box>
  );
};

export default ProfileDelete;
