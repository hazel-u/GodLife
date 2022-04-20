import React, { useRef } from "react";
import { Controller, Control, UseFormWatch } from "react-hook-form";
import { TextField } from "@mui/material";
import { JoinInput } from "../../types/user";

const PasswordContoller: React.FC<{
  control: Control<JoinInput, any>;
  watch: UseFormWatch<JoinInput>;
}> = ({ control, watch }) => {
  const password = useRef("");
  password.current = watch("password", "");

  return (
    <>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "비밀번호를 입력해주세요.",
          },
          minLength: {
            value: 8,
            message: "비밀번호는 8자 이상 입력해주세요.",
          },
          maxLength: {
            value: 20,
            message: "비밀번호는 20자 이내로 입력해주세요.",
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
            message: "영소문자, 숫자, 특수문자를 포함해주세요.",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="비밀번호"
            type="password"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "비밀번호를 다시 입력해주세요.",
          },
          validate: (value) => {
            if (value !== password.current) {
              return "비밀번호가 일치하지 않습니다.";
            }
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="비밀번호 확인"
            type="password"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
          />
        )}
      />
    </>
  );
};

export default PasswordContoller;
