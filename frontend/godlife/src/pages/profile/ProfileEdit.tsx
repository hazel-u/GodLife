import { Box, Divider, Stack } from "@mui/material";
import axios from "axios";

import { useForm } from "react-hook-form";

import { OutlinedButton } from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { selectUser } from "../../store/user";
import NicknameController from "./NicknameController";

const ProfileEdit = ({ handleClose }: { handleClose: () => void }) => {
  const { email, name } = useAppSelector(selectUser);
  const { control, trigger, getValues, handleSubmit } = useForm<{
    name: string;
  }>({});

  const dispatch = useAppDispatch();
  const onSubmit = (data: { name: string }) => {
    axios
      .post("user/info", data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        handleClose();
        dispatch(
          setSnackbar({
            open: true,
            message: "닉네임이 변경되었습니다.",
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
    <Box sx={{ maxWidth: "300px", margin: "0 auto" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <p style={{ minWidth: "45px" }}>이메일</p>
        <p>{email}</p>
      </Stack>

      <Divider sx={{ margin: "10px 0" }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} alignItems="center">
          <p style={{ marginTop: 0, minWidth: "45px" }}>닉네임</p>
          <NicknameController
            control={control}
            trigger={trigger}
            getValues={getValues}
            currentNickname={name}
          />
        </Stack>
        <Box sx={{ textAlign: "center", margin: "20px 0" }}>
          <OutlinedButton variant="outlined" type="submit">
            닉네임 수정
          </OutlinedButton>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileEdit;
