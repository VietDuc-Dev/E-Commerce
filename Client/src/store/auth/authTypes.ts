export interface FormDataType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: { url: string };
  created_at: string;
}

export interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isRequestingForToken: boolean;
  isCheckingAuth: boolean;
}
