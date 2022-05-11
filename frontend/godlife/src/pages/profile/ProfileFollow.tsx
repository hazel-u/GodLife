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
        sx={{ whiteSpace: "pre-line", margin: "2px 0", cursor: "pointer" }}
      >
        팔로워{" "}
        <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
          {followingCnt}{" "}
        </span>{" "}
        | 팔로잉{" "}
        <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
          {followerCnt}{" "}
        </span>
      </Typography>
    </Box>
  );
}

export default ProfileFollow;
