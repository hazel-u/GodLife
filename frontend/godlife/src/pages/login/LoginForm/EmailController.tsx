import React from "react";
import { Control, Controller } from "react-hook-form";

import { OutlinedInput } from "../../../components/common/Input";
import { LoginInput } from "../../../types/user";

const EmailController: React.FC<{
  control: Control<LoginInput, any>;
}> = ({ control }) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <OutlinedInput
          {...field}
          placeholder="이메일"
          type="email"
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
