import { Box, Grid } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

import Bingo from "../../../components/common/Bingo/Bingo";

const PreviousBingoList = () => {
  const dummyBingoList = [
    {
      id: "UUzzID",
      code: "Long",
      title: "String",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
    {
      id: "UUIDd111",
      code: "Long11111",
      title: "String654135154",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
    {
      id: "UUaID",
      code: "Long",
      title: "String",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
    {
      id: "UUIDqea111",
      code: "Long11111",
      title: "String654135154",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
    {
      id: "UUqweqweID",
      code: "Long",
      title: "String",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
    {
      id: "UUIsdfsdfD111",
      code: "Long11111",
      title: "String654135154",
      goals: [
        {
          seq: "Long1",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long2",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long3",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long11",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long12",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long13",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long21",
          content: "Strisdfsfdng",
          category: "건강한삶", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long22",
          content: "Striasdaaaaang",
          category: "미라클모닝", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
        {
          seq: "Long23",
          content: "String234235",
          category: "자기개발", // 건강한삶 | 미라클모닝 | 자기개발 | 삶의 질 | 습관개선 | 환경
        },
      ],
      userEmail: "String",
      activate: false, // 현재 활성화된 빙고인지
      godlife: false, // 갓생 완료 (3빙고) 된 빙고인지
      startDate: "LocalDate",
      likeCnt: 2,
      commentCnt: 3, // 댓글 개수
      comments: null, // 모든 갓생 불러오기에는 댓글리스트가 NULL로 보내집니다.
    },
  ];
  const [bingoList, setBingoList] = useState(dummyBingoList);

  useEffect(() => {
    axios.get("bingo", {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
    // .then((res) => setBingoList(res.data));
  }, []);

  return (
    <Grid container spacing={4} sx={{ padding: "30px" }}>
      {dummyBingoList.map((bingo) => (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ maxWidth: "300px", margin: "auto" }}>
            <Bingo
              title={bingo.title}
              createdBy={"백우민"}
              size={3}
              goals={bingo.goals}
              mode={"Active"}
              date={new Date()}
              streak={1}
              totalUses={1}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PreviousBingoList;
