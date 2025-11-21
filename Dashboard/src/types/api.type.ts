export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: { url: string };
  created_at: string;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};
