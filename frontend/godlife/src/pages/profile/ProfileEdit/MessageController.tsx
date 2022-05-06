import React from "react";
import { Control, Controller } from "react-hook-form";

import { OutlinedInput } from "../../../components/common/Input";

interface MessageControllerProps {
  control: Control<{ info: string }, any>;
  currentMessage: string;
}

const MessageController = ({
  control,
  currentMessage,
}: MessageControllerProps) => {
  return (
    <>
      <Controller
        name="info"
        control={control}
        defaultValue={currentMessage}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            placeholder="상태메시지"
            onChange={(e) => {
              field.onChange(e);
            }}
            size="small"
            sx={{ width: "200px", paddingTop: "10px" }}
          />
        )}
      />
    </>
  );
};

export default MessageController;
