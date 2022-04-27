import { useEffect, useState } from "react";

const useCountdown = () => {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const countDownDate = tomorrow.getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return countDown;
};

export default useCountdown;
