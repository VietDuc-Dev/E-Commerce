import crypto from "crypto";
import { fifteenFromNow } from "./date-time";

export const generateResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetPasswordExpireTime = fifteenFromNow();

  return { resetToken, hashedToken, resetPasswordExpireTime };
};
