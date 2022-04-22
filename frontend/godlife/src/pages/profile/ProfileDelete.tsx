import { Box } from "@mui/material";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../components/common/Button";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";

const ProfileDelete = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteProfile = () => {
    axios
      .delete("user", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
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
  };

  return (
    <Box>
      <h3>정말 탈퇴하시겠습니까?</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi porro
        recusandae maiores cupiditate corporis placeat hic reprehenderit tenetur
        voluptate. Odit aliquid excepturi minima. Eligendi reprehenderit
        accusantium quisquam expedita, vitae voluptatum?
      </p>
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
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
