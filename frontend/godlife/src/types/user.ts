export interface JoinInput {
  email: string;
  nickname: string;
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
  isLogged: boolean;
}

export interface ChangePasswordInput {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
