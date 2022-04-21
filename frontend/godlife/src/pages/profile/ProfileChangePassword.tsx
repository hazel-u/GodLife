import React from "react";
import { ChangePasswordInput } from "../../types/user";
import { Controller, useForm } from "react-hook-form";
import PasswordContoller from "./PasswordContoller";
import { Button, FormControl, TextField } from "@mui/material";
import axios from "axios";

const ProfileChangePassword = () => {
  const { control, handleSubmit, watch } = useForm<ChangePasswordInput>({});
  const onSubmit = (data: ChangePasswordInput) => {
    axios({
      method: "post",
      url: "user/join",
      data: {
        email: data.currentPassword,
        password: data.password,
        nickname: data.confirmPassword,
      },
    })
      .then((res) => {
        // navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <>
      <p>새로 사용할 비밀번호를 입력해주세요.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="현 비밀번호"
                type="password"
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ? fieldState.error.message : " "
                }
              />
            )}
            name="currentPassword"
            control={control}
            rules={{
              required: { value: true, message: "비밀번호를 입력해주세요." },
            }}
            defaultValue=""
          />
          <PasswordContoller control={control} watch={watch} />
          <Button variant="contained" type="submit">
            비밀번호 변경
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default ProfileChangePassword;
