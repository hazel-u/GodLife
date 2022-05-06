import { Box, Typography } from "@mui/material";

import React from "react";

export interface ProfileFollowProps {
  setOpenFollowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileFollow(props: ProfileFollowProps) {
  const { setOpenFollowDialog } = props;

  return (
    <Box onClick={() => setOpenFollowDialog(true)}>
      <Typography
        sx={{ whiteSpace: "pre-line", margin: "2% 0", cursor: "pointer" }}
      >
        팔로워 O | 팔로잉 O
      </Typography>
    </Box>
  );
}

export default ProfileFollow;
