import React from "react";
import Bingo from "./components/commons/Bingo/Bingo";

const exampleBingo = [
  "일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼일이삼",
  "이삼사",
  "삼사오",
  "사오육",
  "오육칠",
  "육칠팔",
  "칠팔구",
  "팔",
  "구",
];

function App() {
  return (
    <div className="App">
      <Bingo
        title={"도와주세요!! 개발자가 갇혀있어요!"}
        createdBy={"백우민"}
        size={3}
        goals={exampleBingo}
        mode={"Active"}
        date={new Date()}
        streak={1}
        totalUses={1}
      />
    </div>
  );
}

export default App;
