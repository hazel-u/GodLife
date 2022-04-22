import { CommentType } from "./comment";

export interface BingoType {
  activate: boolean;
  code: number;
  commentCnt: number;
  comments: CommentType[];
  godlife: boolean;
  id: string;
  likeCnt: number;
  startDate: string;
  title: string;
  userEmail: string;
}
