import nodemailer from "nodemailer";
import { config } from "../../config/app.config";

interface SendEmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({
  email,
  subject,
  message,
}: SendEmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: Number(config.SMTP_PORT) || 587,
      service: config.SMTP_SERVICE || undefined,
      secure: Number(config.SMTP_PORT) === 465,
      auth: {
        user: config.SMTP_MAIL,
        pass: config.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"E-Commerce Support" <${config.SMTP_MAIL}>`,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`📧 Email sent successfully to ${email}: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Gửi email thất bại, vui lòng thử lại sau.");
  }
};
