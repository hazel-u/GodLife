import { Box, Stack, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosWithToken from "../../../utils/axios";

const ProfileFollowingDialogList = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const navigate = useNavigate();
  const [followingList, setFollowingList] = useState([]);

  const getFollowingList = () => {
    axiosWithToken
      .get("user/following")
      .then((res) => {
        setFollowingList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFollowingList();
  }, []);

  return (
    <>
      <Box>
        {followingList.length > 0 ? (
          <>
            {followingList.map((following: any) => (
              <Box
                key={following.name}
                onClick={() => navigate(`/profile/${following.name}`)}
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
                  {following.name}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  갓생 달성 {following.godCount}일 | 연속 갓생 달성{" "}
                  {following.serialGodCount}일
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
              회원님이 팔로우하는 모든 사람이 여기에 표시됩니다.
            </p>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default ProfileFollowingDialogList;
