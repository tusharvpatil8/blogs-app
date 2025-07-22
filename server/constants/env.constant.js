require("dotenv").config();

module.exports = {
  // ------------ Server PORT And Type ---------------------------------
  PORT: process.env.PORT,
  PROJECT_MODE: process.env.PROJECT_MODE,
  

  // ------------ Mongodb URL -------------------------------------------
  MONGODB_DEV_URL: process.env.MONGODB_DEV_URL,
  MONGODB_STAGE_URL: process.env.MONGODB_STAGE_URL,
  MONGODB_PROD_URL: process.env.MONGODB_PROD_URL,

  // ------------ JWT And Crypto-js Sceret Key -----------------------------
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY:
    process.env.NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY,
  NODE_APP_ENCRYPT_DECRYPT_IV_KEY: process.env.NODE_APP_ENCRYPT_DECRYPT_IV_KEY,
  // ------------ AWS -------------------------------------------------------
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  FILE_UPLOAD: process.env.FILE_UPLOAD,

  // ------------ Nodemailer ------------------------------------------------------
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,

  // ------------ Admin Panel URL ---------------------------------------------------
  CLIENT_HOST: process.env.CLIENT_HOST,

  // ------------ Razorpay -----------------------------------------------------------
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,

  // ------------ Agora --------------------------------------------------------------
  AGORA_APP_ID: process.env.AGORA_APP_ID,
  AGORA_CERTIFICATE_KEY: process.env.AGORA_CERTIFICATE_KEY,
  AGORA_REST_API: process.env.AGORA_REST_API,
  AGORA_ORG_NAME: process.env.AGORA_ORG_NAME,
  AGORA_APP_NAME: process.env.AGORA_APP_NAME,
};
