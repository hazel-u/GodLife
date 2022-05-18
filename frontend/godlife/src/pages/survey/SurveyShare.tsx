import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";

import React, { useEffect } from "react";
import ReactGA from "react-ga4";

import { ReactComponent as Link } from "../../assets/icon/link.svg";
import { ReactComponent as FacebookLogo } from "../../assets/logo/Brand/facebook.svg";
import { ReactComponent as KakaotalkLogo } from "../../assets/logo/Brand/kakaotalk.svg";
import { ReactComponent as TwitterLogo } from "../../assets/logo/Brand/twitter.svg";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";

const SurveyShareTwitter = () => {
  let text = `✨ 갓생러 테스트✨%0A
  🏃‍♀️나는 어떤 타입의 갓생러일까?%0A
  🔥지금 바로 알아보러 가기!
  `;

  return (
    <IconButton
      onClick={() => {
        ReactGA.gtag("event", "share", {
          method: "twitter",
          content_type: "twitter",
          item_id: "twitter",
        });
        window.open(
          `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
        );
      }}
      sx={{ padding: 0, height: "40px" }}
    >
      <SvgIcon
        component={TwitterLogo}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

const SurveyShareKakao = () => {
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

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "갓생러 테스트",
        description: "나는 어떤 타입의 갓생러일까?",
        imageUrl: `https://1.bp.blogspot.com/-0COdft6-l4w/XDXcE0JS7JI/AAAAAAABRGo/OVQtG33u86I_VKvjEyRdA4meoNib2kVuACLcBGAs/s400/pose_udemakuri_woman.png`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
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

const SurveyShare = () => {
  const dispatch = useAppDispatch();

  return (
    <Stack direction="column" alignItems="center" sx={{ margin: "8% 0" }}>
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mb={2}>
        친구들에게 공유하기
      </Typography>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            dispatch(
              setSnackbar({
                open: true,
                message: "갓생 링크가 클립보드에 복사되었습니다.",
                severity: "success",
              })
            );
            ReactGA.gtag("event", "share", {
              method: "link",
              content_type: "link",
              item_id: "link",
            });
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={Link}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <SurveyShareKakao />
        <SurveyShareTwitter />

        <IconButton
          onClick={() => {
            ReactGA.gtag("event", "share", {
              method: "facebook",
              content_type: "facebook",
              item_id: "facebook",
            });
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={FacebookLogo}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default SurveyShare;
