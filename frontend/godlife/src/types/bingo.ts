import { CommentType } from "./comment";

export interface BingoType {
  activate: boolean;
  code: number;
  commentCnt: number;
  comments: CommentType[];
  godlife: boolean;
  id: string;
  likeCnt: number;
  startDate: number[];
  title: string;
  userEmail: string;
  userName: string;
  goals: {
    seq: number;
    content: string;
    category: string;
    completed: boolean;
  }[];
  godCount: number;
}
