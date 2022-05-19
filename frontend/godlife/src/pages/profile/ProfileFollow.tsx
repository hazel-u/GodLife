import { Stack, Typography } from "@mui/material";

import React, { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";
import ProfileFollowDialog from "./ProfileFollowDialog";

function ProfileFollow() {
  const [value, setValue] = useState(0);
  const [openFollowDialog, setOpenFollowDialog] = useState(false);
  const { followerCnt, followingCnt } = useAppSelector(selectUser);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography
          sx={{
            margin: "2px 3px",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenFollowDialog(true);
            setValue(0);
          }}
        >
          팔로워{" "}
          <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
            {followingCnt}{" "}
          </span>{" "}
        </Typography>
        <Typography
          sx={{
            margin: "2px 3px",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenFollowDialog(true);
            setValue(1);
          }}
        >
          | 팔로잉{" "}
          <span style={{ fontFamily: "Reggae One", fontWeight: 900 }}>
            {followerCnt}{" "}
          </span>
        </Typography>
      </Stack>
      <ProfileFollowDialog
        open={openFollowDialog}
        setOpenFollowDialog={setOpenFollowDialog}
        check={value}
      />
    </>
  );
}

export default ProfileFollow;
