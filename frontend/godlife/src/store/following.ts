import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { FollowingUserInfo } from "../types/following";

const initialState: FollowingUserInfo = {
  allBingo: [],
  followerCount: 0,
  followingCount: 0,
  godCount: 0,
  info: "",
  name: "",
  serialGodCount: 0,
  todayBingo: {
    activate: false,
    code: "",
    comment: [],
    godlife: false,
    id: "",
    likeCnt: 0,
    startDate: [],
    title: "",
    userEmail: "",
    userName: "",
    goals: [],
    godCount: 0,
    serialGodCount: 0,
  },
};

export const followingUserSlice = createSlice({
  name: "followingUser",
  initialState,
  reducers: {
    setFollowingUser: (state, action: PayloadAction<FollowingUserInfo>) => {
      return (state = { ...action.payload });
    },
  },
});

export const { setFollowingUser } = followingUserSlice.actions;

export const selectFollowingUser = (state: RootState) => state.followingUser;

export default followingUserSlice.reducer;
