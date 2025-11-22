export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
};

export const BASE_ROUTE = {
  RESET_PASSWORD: "/password/reset/:token",
};
