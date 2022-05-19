import { Box, Stack, Typography } from "@mui/material";

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
      .catch(() => {});
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
                  marginBottom: "20px",
                }}
              >
                <Typography
                  fontSize={18}
                  fontFamily="BMEULJIRO"
                  sx={{ whiteSpace: "pre-line", margin: "5px 0" }}
                >
                  {follower.name}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  갓생 달성 {follower.godCount}일 | 연속 갓생 달성{" "}
                  {follower.serialGodCount}일
                </Typography>
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
