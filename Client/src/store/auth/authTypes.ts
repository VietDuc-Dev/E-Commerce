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

export interface UpdateProfile {
  name: string;
  email: string;
  avatar?: unknown;
}

export interface AuthState {
  authUser: null | [];
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isRequestingForToken: boolean;
  isCheckingAuth: boolean;
}
