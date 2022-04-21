import { Box } from "@mui/material";
import NicknameController from "./NicknameController";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";

const ProfileEdit = () => {
  const { email, nickname } = useAppSelector(selectUser);

  return (
    <Box>
      <Box>
        <span>이메일</span>
        <span>{email}</span>
      </Box>
      <Box>
        <span>닉네임</span>

        <NicknameController currentNickname={nickname} />
      </Box>
    </Box>
  );
};

export default ProfileEdit;
