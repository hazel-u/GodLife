import { CommentType } from "./comment";

export interface FollowingUserInfo {
  allBingo: {
    code: string;
    godlife: boolean;
    id: string;
  }[];
  followerCount: number;
  followingCount: number;
  godCount: number;
  info: string;
  name: string;
  serialGodCount: number;
  todayBingo: {
    id: string;
    code: string;
    title: string;
    userEmail: string;
    userName: string;
    activate: boolean;
    godlife: boolean;
    startDate: number[];
    likeCnt: number;
    goals: {
      seq: number;
      content: string;
      category: string;
      completed: boolean;
    }[];
    comment: CommentType[];
    godCount: number;
    serialGodCount: number;
  };
}
