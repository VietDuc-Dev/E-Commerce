export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface forgotPasswordDto {
  email: string;
  frontendUrl: string;
}

export interface updateProfileDto {
  name: string;
  email: string;
  avatar?: any;
}
