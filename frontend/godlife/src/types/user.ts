export interface JoinInput {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  nickname: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
