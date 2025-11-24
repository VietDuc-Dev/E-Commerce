import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import ResetPassword from "@/pages/AuthPages/ResetPassword";
import SignIn from "../../pages/AuthPages/SignIn";
import SignUp from "../../pages/AuthPages/SignUp";
import Home from "../../pages/Dashboard/Home";
import ForgotPassword from "@/pages/AuthPages/ForgotPassword";
import UserProfiles from "@/pages/UserProfiles";
import UserManagement from "@/pages/UserManagement";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: AUTH_ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <Home /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <UserProfiles /> },
  { path: PROTECTED_ROUTES.USERMANAGEMENT, element: <UserManagement /> },
];

// export const baseRoutePaths = [
//   { path: BASE_ROUTE.RESET_PASSWORD, element: <ResetPassword /> },
// ];
