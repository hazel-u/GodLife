import { IconButton } from "@mui/material";

import React, { useEffect } from "react";

import KakaotalkLogo from "../../../assets/logo/Brand/kakaotalk.png";

interface KakaoShareProps {
  likeCount: number;
  commentCount: number;
}

const KakaoShare = (props: KakaoShareProps) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  }, []);

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "갓생살기",
        description: "갓생을 함께 살자는 유도문구",
        imageUrl:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      social: {
        likeCount: props.likeCount,
        commentCount: props.commentCount,
        // sharedCount: 30,
      },
    });
  };
  return (
    <IconButton onClick={shareKakao} sx={{ padding: 0, height: "40px" }}>
      <img src={KakaotalkLogo} alt="Kakaotalk Logo" style={{ width: "40px" }} />
    </IconButton>
  );
};

export default KakaoShare;
