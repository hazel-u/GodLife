import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Stack, Typography } from "@mui/material";

import React from "react";

import { selectBingo } from "../../store/bingo";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";

export interface ProfileInfoProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileInfo(props: ProfileInfoProps) {
  const { setOpen } = props;
  const { email, name, info } = useAppSelector(selectUser);
  const { godCount, serialGodCount, userEmail } = useAppSelector(selectBingo);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "65px",
          "& p": {
            fontFamily: "BMEULJIRO",
          },
        }}
      >
        <Typography fontSize={30} fontFamily="BMEULJIRO">
          {name}님의 프로필
        </Typography>
        {userEmail === email && (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <SettingsIcon />
          </IconButton>
        )}
      </Stack>

      <Typography fontSize={18} sx={{ margin: "0 0 20px" }}>
        {info}
      </Typography>
      <Typography sx={{ whiteSpace: "pre-line" }}>
        갓생 달성 {godCount}일 | 연속 갓생 달성 {serialGodCount}일
      </Typography>
    </>
  );
}

export default ProfileInfo;
