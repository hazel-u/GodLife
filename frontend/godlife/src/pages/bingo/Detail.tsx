import Bingo from "../../components/commons/Bingo/Bingo";
import Container from "@mui/material/Container";

const exampleBingo = [
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
  {
    content: "일이삼사오",
    isCompleted: false,
  },
];

const Detail = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Detail;
