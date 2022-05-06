import { IconButton, SvgIcon } from "@mui/material";
import html2canvas from "html2canvas";

import React, { useEffect, useMemo } from "react";
import ReactGA from "react-ga4";

import { ReactComponent as KakaotalkLogo } from "../../../assets/logo/Brand/kakaotalk.svg";
import { selectBingo } from "../../../store/bingo";
import { useAppSelector } from "../../../store/hooks";
import { uploadImage } from "../../../utils/uploadImage";

const BingoDetailShareKakao = () => {
  const { likeCnt, comments } = useAppSelector(selectBingo);
  const today = useMemo(() => new Date(), []);
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const { code } = useAppSelector(selectBingo);
  const imageName = `${month}월_${date}일의_갓생_${today.getTime()}${code}.png`;

  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const shareKakao = () => {
    ReactGA.gtag("event", "share", {
      method: "kakao",
      content_type: "kakao",
      item_id: "kakao",
    });

    const bingo = document.getElementById("bingo-box");

    if (bingo) {
      html2canvas(bingo).then((canvas) => {
        canvas.toBlob(
          (blob: any) => {
            const formData = new FormData();
            formData.append("image", blob, imageName);

            uploadImage(formData.get("image"))
              .then(() => {
                window.Kakao.Link.sendDefault({
                  objectType: "feed",
                  content: {
                    title: "갓생살기",
                    description: "쉽게만 살아가면 재미없어 빙고!",
                    imageUrl: `https://s3.ap-northeast-2.amazonaws.com/today.godlife/${imageName}`,
                    link: {
                      mobileWebUrl: window.location.href,
                      webUrl: window.location.href,
                    },
                  },
                  social: {
                    likeCount: likeCnt,
                    commentCount: comments.length,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "image/png",
          1
        );
      });
    }
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

export default BingoDetailShareKakao;
