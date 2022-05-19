import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { UserInfo } from "../types/user";

const initialState: UserInfo = {
  email: "",
  name: "",
  godCount: 0,
  recentDate: null,
  joinType: "",
  info: "",
  followerCnt: 0,
  followingCnt: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserInfo>) => {
      return (state = { ...action.payload });
    },
    clearLoggedUser: () => initialState,
  },
});

export const { setLoggedUser, clearLoggedUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
