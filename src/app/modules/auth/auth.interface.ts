
export type TUserLogin = {
  email: string;
  password: string;
};

export type TNewUser = {
  name: string;
  picture: string;
} & TUserLogin;

