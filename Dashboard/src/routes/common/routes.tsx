import ResetPassword from "@/pages/AuthPages/ResetPassword";
import SignIn from "../../pages/AuthPages/SignIn";
import SignUp from "../../pages/AuthPages/SignUp";
import Home from "../../pages/Dashboard/Home";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <Home /> },
];

export const baseRoutePaths = [
  { path: BASE_ROUTE.RESET_PASSWORD, element: <ResetPassword /> },
];
