export const sanitizeUser = (user: Record<string, any>) => {
  if (!user) return null;
  const { password, reset_password_token, reset_password_expire, ...safeUser } =
    user;
  return safeUser;
};
