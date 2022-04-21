import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { UserInfo } from "../types/user";

const initialState: UserInfo = {
  email: "",
  nickname: "",
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserInfo>) => {
      return (state = { ...action.payload, isLogged: true });
    },
  },
});

export const { setLoggedUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
