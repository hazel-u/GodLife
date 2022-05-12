import { Box, Divider, Stack } from "@mui/material";

import { useForm } from "react-hook-form";

import { OutlinedButton } from "../../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { selectUser, setLoggedUser } from "../../../store/user";
import axiosWithToken from "../../../utils/axios";
import NicknameController from "./NicknameController";

const ProfileEdit = ({ handleClose }: { handleClose: () => void }) => {
  const { email, name } = useAppSelector(selectUser);
  const { control, trigger, getValues, handleSubmit } = useForm<{
    name: string;
  }>({});

  const dispatch = useAppDispatch();
  const onSubmitNickname = (data: { name: string }) => {
    axiosWithToken
      .post("user/info", data)
      .then(() => {
        handleClose();
        axiosWithToken.get("user/info").then((res) => {
          dispatch(setLoggedUser(res.data));
        });
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

      <form onSubmit={handleSubmit(onSubmitNickname)}>
        <Stack direction="row" spacing={2} alignItems="center">
          <p style={{ marginTop: 0, minWidth: "45px" }}>닉네임</p>
          <NicknameController
            control={control}
            trigger={trigger}
            getValues={getValues}
            currentNickname={name}
          />
        </Stack>
        <Box sx={{ textAlign: "center", margin: "10px 0" }}>
          <OutlinedButton variant="outlined" type="submit">
            닉네임 수정
          </OutlinedButton>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileEdit;
