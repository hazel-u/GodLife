import { IconButton, SvgIcon } from "@mui/material";

import React, { useEffect } from "react";

import { ReactComponent as KakaotalkLogo } from "../../../assets/logo/Brand/kakaotalk.svg";
import { selectBingo } from "../../../store/bingo";
import { useAppSelector } from "../../../store/hooks";

const KakaoShare = () => {
  const { likeCnt, comments } = useAppSelector(selectBingo);

  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "갓생살기",
        description: "쉽게만 살아가면 재미없어 빙고!",
        imageUrl:
          "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/Group+333.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      social: {
        likeCount: likeCnt,
        commentCount: comments.length,
        // sharedCount: 30,
      },
    });
  };
  return (
    <IconButton onClick={shareKakao} sx={{ padding: 0, height: "40px" }}>
      <SvgIcon
        component={KakaotalkLogo}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

export default KakaoShare;
