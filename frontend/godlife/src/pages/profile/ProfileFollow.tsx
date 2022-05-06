import { Box, Typography } from "@mui/material";

import React from "react";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";

export interface ProfileFollowProps {
  setOpenFollowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileFollow(props: ProfileFollowProps) {
  const { setOpenFollowDialog } = props;
  const { followerCnt, followingCnt } = useAppSelector(selectUser);

  return (
    <Box onClick={() => setOpenFollowDialog(true)}>
      <Typography
        sx={{ whiteSpace: "pre-line", margin: "2% 0", cursor: "pointer" }}
      >
        팔로워 {followerCnt} | 팔로잉 {followingCnt}
      </Typography>
    </Box>
  );
}

export default ProfileFollow;
