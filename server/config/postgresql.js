require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    //     dialect: "postgres",
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
  stage: {
    username: process.env.STAGE_DB_USERNAME,
    password: process.env.STAGE_DB_PASSWORD,
    database: process.env.STAGE_DB_NAME,
    host: process.env.STAGE_DB_HOSTNAME,
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
};
