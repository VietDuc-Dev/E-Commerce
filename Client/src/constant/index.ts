export const AuthModeEnum = {
  signin: "signin",
  signup: "signup",
  forgot: "forgot",
  reset: "reset",
} as const;

export type AuthModeEnumType = keyof typeof AuthModeEnum;
