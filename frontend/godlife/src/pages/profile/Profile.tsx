import React, { useState } from "react";
import ProfileTab from "./ProfileTab";
import ProfileEdit from "./ProfileEdit";
import ProfileChangePassword from "./ProfileChangePassword";
import { Box, Divider, Stack } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [tab, setTab] = useState("info");

  return (
    <>
      <ProfileTab tab={tab} setTab={setTab} />
      <Divider />
      <Stack direction="column" alignItems="center">
        {tab === "info" && <ProfileEdit />}
        {tab === "password" && <ProfileChangePassword />}
      </Stack>
    </>
  );
};

export default Profile;
