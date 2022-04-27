import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import { selectTodayBingo } from "../store/todayBingo";

const Main = () => {
  const navigate = useNavigate();
  const { code } = useAppSelector(selectTodayBingo);
  useEffect(() => {
    if (code) {
      navigate(`/bingo/${code}`);
    } else {
      navigate("create");
    }
  }, [code, navigate]);

  return null;
};

export default Main;
