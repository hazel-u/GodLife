import { IconButton, SvgIcon } from "@mui/material";
import domtoimage from "dom-to-image";

import React, { useMemo } from "react";
import ReactGA from "react-ga4";

import { ReactComponent as Image } from "../../../assets/icon/image.svg";
import { selectBingo } from "../../../store/bingo";
import { useAppSelector } from "../../../store/hooks";
import { uploadImage } from "../../../utils/uploadImage";

const BingoDetailShareImage = () => {
  const today = useMemo(() => new Date(), []);
  const month = today.getMonth() + 1; // 월
  const date = today.getDate(); // 날짜
  const { code } = useAppSelector(selectBingo);
  const imageName = `${month}월_${date}일의_갓생_${today.getTime()}${code}.png`;

  const saveImage = () => {
    const bingo = document.getElementById("bingo");

    if (bingo) {
      domtoimage.toBlob(bingo).then((blob) => {
        const formData = new FormData();
        formData.append("image", blob, imageName);

        uploadImage(formData.get("image"))
          .then(() => {
            const link = window.document.createElement("a");
            link.href = `https://s3.ap-northeast-2.amazonaws.com/today.godlife/${imageName}`;
            link.click();
          })
          .catch(() => {});
      });
    }

    ReactGA.gtag("event", "share", {
      method: "image",
      content_type: "image",
      item_id: "image",
    });
  };

  return (
    <IconButton onClick={saveImage} sx={{ padding: 0, height: "40px" }}>
      <SvgIcon
        component={Image}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

export default BingoDetailShareImage;
