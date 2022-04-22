import { Box } from "@mui/material";
import axios from "axios";

import { useForm } from "react-hook-form";

import { OutlinedButton } from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { selectUser } from "../../store/user";
import NicknameController from "./NicknameController";

const ProfileEdit = () => {
  const { email, nickname } = useAppSelector(selectUser);
  const { control, trigger, getValues, handleSubmit } = useForm<{
    name: string;
  }>({});

  const dispatch = useAppDispatch();
  const onSubmit = (data: { name: string }) => {
    axios
      .patch(
        "user",
        { data },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
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
    <Box>
      <Box>
        <p>이메일</p>
        <p>{email}</p>
      </Box>

      <p>닉네임</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "inline" }}>
        <NicknameController
          control={control}
          trigger={trigger}
          getValues={getValues}
          currentNickname={nickname}
        />
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
