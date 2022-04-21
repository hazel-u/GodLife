import React from "react";
import { Box, Divider } from "@mui/material";
import Comment from "./Comment";

const CommentList = () => {
  const dummy = [
    {
      author: "사람1",
      content:
        "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는 이에 대한 피해의 배상을 청구할 수 있다.",
    },
    {
      author: "사람123",
      content:
        "외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다.",
    },
    {
      author: "사sfda",
      content:
        "모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.",
    },
    {
      author: "사람asd231",
      content:
        "헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다.",
    },
  ];

  return (
    <Box sx={{ maxWidth: "500px" }}>
      <p>댓글 {dummy.length}개</p>
      {dummy.map((comment, index) => (
        <>
          <Comment comment={comment} />
          {index !== dummy.length - 1 && <Divider />}
        </>
      ))}
    </Box>
  );
};

export default CommentList;
