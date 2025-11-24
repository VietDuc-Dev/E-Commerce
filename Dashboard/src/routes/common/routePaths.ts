export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
  FORGOT_PASSWORD: "forgot-password",
  RESET_PASSWORD: "password/reset/:token",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "home",
  PROFILE: "profile",
  USERMANAGEMENT: "user-management",
};

// export const BASE_ROUTE = {
//   RESET_PASSWORD: "/password/reset/:token",
// };
