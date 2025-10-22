export interface userType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  reset_password_token?: string;
  reset_password_expire?: string;
  created_at: Date;
}