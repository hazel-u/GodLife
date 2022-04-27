import lottie from "lottie-web";

import { useEffect } from "react";

interface LottieProps {
  animationData: any;
  width: number;
  height: number;
}

const Lottie = ({ animationData, width, height }: LottieProps) => {
  const containter = document.querySelector("#lottie-container");

  useEffect(() => {
    containter &&
      lottie.loadAnimation({
        animationData,
        container: containter,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
  }, [containter, animationData]);

  return <div id="lottie-container" style={{ width, height }} />;
};

export default Lottie;
