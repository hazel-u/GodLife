import { Box, Stack } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosWithToken from "../../../utils/axios";

const ProfileFollowerDialogList = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const navigate = useNavigate();
  const [followerList, setFollowerList] = useState([]);

  const getFollowingList = () => {
    axiosWithToken
      .get("user/follower")
      .then((res) => {
        setFollowerList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFollowingList();
  }, []);

  return (
    <>
      <Box>
        {followerList.length > 0 ? (
          <>
            {followerList.map((follower: any) => (
              <Box
                key={follower.name}
                onClick={() => navigate(`/profile/${follower.name}`)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <p>{follower.name}</p>
              </Box>
            ))}
          </>
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <p style={{ fontSize: "15px" }}>
              회원님을 팔로우하는 모든 사람이 여기에 표시됩니다.
            </p>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default ProfileFollowerDialogList;
