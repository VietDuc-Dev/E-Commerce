import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
  PORT: getEnv("PORT", "5000"),
  FRONTEND_URL: getEnv("FRONTEND_URL"),
  DASHBOARD_URL: getEnv("DASHBOARD_URL"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),

  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "30d"),
  COOKIE_EXPIRES_IN: getEnv("COOKIE_EXPIRES_IN", "30"),
  JWT_SECRET_KEY: getEnv("JWT_SECRET_KEY"),

  SMTP_SERVICE: getEnv("SMTP_SERVICE", "mail"),
  SMTP_MAIL: getEnv("SMTP_MAIL", "gmail@gmail.com"),
  SMTP_PASSWORD: getEnv("SMTP_PASSWORD"),
  SMTP_HOST: getEnv("SMTP_HOST", "smtp.gmail.com"),
  SMTP_PORT: getEnv("SMTP_PORT", "465"),

  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
  CLOUDINARY_CLIENT_NAME: getEnv("CLOUDINARY_CLIENT_NAME"),
  CLOUDINARY_CLIENT_API: getEnv("CLOUDINARY_CLIENT_API"),
  CLOUDINARY_CLIENT_SECRET: getEnv("CLOUDINARY_CLIENT_SECRET"),
  STRIPE_SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: getEnv("STRIPE_WEBHOOK_SECRET"),
  STRIPE_FRONTEND_KEY: getEnv("STRIPE_FRONTEND_KEY"),

  DB_USER: getEnv("DB_USER"),
  DB_HOST: getEnv("DB_HOST"),
  DB_NAME: getEnv("DB_NAME"),
  DB_PASSWORD: getEnv("DB_PASSWORD"),
  DB_PORT: getEnv("DB_PORT"),
});

export const config = appConfig();
