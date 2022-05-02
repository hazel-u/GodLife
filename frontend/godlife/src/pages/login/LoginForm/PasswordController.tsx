import React from "react";
import { Control, Controller } from "react-hook-form";

import { OutlinedInput } from "../../../components/common/Input";
import { LoginInput } from "../../../types/user";

const PasswordContoller: React.FC<{
  control: Control<LoginInput, any>;
}> = ({ control }) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <OutlinedInput
          {...field}
          placeholder="비밀번호"
          type="password"
          error={!!fieldState.error}
          helperText={
            fieldState.error?.message ? fieldState.error.message : " "
          }
        />
      )}
      name="password"
      control={control}
      rules={{
        required: { value: true, message: "비밀번호를 입력해주세요." },
      }}
      defaultValue=""
    />
  );
};

export default PasswordContoller;
