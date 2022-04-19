import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField } from "@mui/material";
import { LoginInput } from "../../types/user";

const EmailController: React.FC<{
  control: Control<LoginInput, any>;
}> = ({ control }) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="이메일"
          type="text"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ? fieldState.error.message : " "
          }
        />
      )}
      name="email"
      control={control}
      rules={{
        required: { value: true, message: "이메일을 입력해주세요." },
      }}
      defaultValue=""
    />
  );
};

export default EmailController;
