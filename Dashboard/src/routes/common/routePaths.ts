export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/dashboard/signin",
  SIGN_UP: "/dashboard/signup",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard/home",
};

export const BASE_ROUTE = {
  RESET_PASSWORD: "/dashboard/password/reset/:token",
};
