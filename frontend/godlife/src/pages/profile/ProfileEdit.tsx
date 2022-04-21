import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserInfo } from "../../types/user";
import NicknameController from "./NicknameController";
import { Box } from "@mui/material";

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "email@email.com",
    nickname: "일이samsa",
  });

  useEffect(() => {
    axios
      .get("user/info", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <Box>
      <Box>
        <span>이메일</span>
        <span>{userInfo?.email}</span>
      </Box>
      <Box>
        <span>닉네임</span>

        {userInfo && <NicknameController currentNickname={userInfo.nickname} />}
      </Box>
    </Box>
  );
};

export default ProfileEdit;
