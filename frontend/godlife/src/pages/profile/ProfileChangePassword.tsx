import { Stack } from "@mui/material";
import axios from "axios";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import { OutlinedButton } from "../../components/common/Button";
import { OutlinedInput } from "../../components/common/Input";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { ChangePasswordInput } from "../../types/user";
import PasswordContoller from "./PasswordContoller";

const ProfileChangePassword = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { control, handleSubmit, watch, setError } =
    useForm<ChangePasswordInput>({});

  const dispatch = useAppDispatch();
  const onSubmit = (data: ChangePasswordInput) => {
    axios
      .post("user/change-pw", data, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(() => {
        handleClose();
        dispatch(
          setSnackbar({
            open: true,
            message: "비밀번호가 변경되었습니다.",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        if (err.response.data.code === "WRONG_PASSWORD") {
          setError("oldPassword", {
            type: "manual",
            message: err.response.data.message,
          });
        } else {
          dispatch(
            setSnackbar({
              open: true,
              message: "다시 시도해주세요.",
              severity: "error",
            })
          );
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" alignItems="center" spacing={1.5}>
          <p>새로 사용할 비밀번호를 입력해주세요.</p>
          <Controller
            render={({ field, fieldState }) => (
              <OutlinedInput
                {...field}
                placeholder="현 비밀번호"
                type="password"
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ? fieldState.error.message : " "
                }
              />
            )}
            name="oldPassword"
            control={control}
            rules={{
              required: { value: true, message: "현 비밀번호를 입력해주세요." },
            }}
            defaultValue=""
          />
          <PasswordContoller control={control} watch={watch} />
          <OutlinedButton variant="outlined" type="submit">
            비밀번호 변경
          </OutlinedButton>
        </Stack>
      </form>
    </>
  );
};

export default ProfileChangePassword;
