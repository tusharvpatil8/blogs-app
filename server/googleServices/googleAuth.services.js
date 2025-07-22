/*
create googleAuthTokensModel for storing the tokens for google auth,
always store the refresh tokens in googleAuthTokensModel because you can get those only when ypu call the auth api 
for the first time using one email, on every other calls you only get access token

use following functions appropriately to set up google auth
*/

const googleAuthTokensModel = require("../models/googleAuthTokens.model");
const createError = require("http-errors");
const { google } = require("googleapis");

module.exports = {
  setGoogleAuthTokens: async (userId, data) => {
    try {
      console.log("data", data);
      console.log("userId", userId);
      const tokens = await googleAuthTokensModel.findOneAndUpdate(
        { user_id: userId },
        data,
        { upsert: true }
      );
      console.log("tokens", tokens);
      if (!tokens)
        throw createError.InternalServerError(
          "Error Creating Google Auth Tokens."
        );
      return tokens;
    } catch (err) {
      throw err;
    }
  },

  getIfUserAuthTokenExists: async (Id) => {
    try {
      const userTokens = await googleAuthTokensModel.findOne({
        userId: Id,
      });
      if (!user) return false;
      return userTokens;
    } catch (err) {
      throw err;
    }
  },

  setCalendarAuthTokens: async (id) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );

      const token = await googleAuthTokensModel.findOne(
        { user_id: id },
        { google_email: 0, user_id: 0 }
      );

      const refreshToken = token?.refresh_token;

      if (!token)
        throw createError.InternalServerError(
          "Please allow to access your calendar."
        );

      const expiryDate = new Date(token.expiry_date);

      if (expiryDate < Date.now()) {
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const accessToken = await oauth2Client.getAccessToken();

        await googleAuthTokensModel.findOneAndUpdate(
          { user_id: id },
          { access_token: accessToken.token }
        );
      }

      oauth2Client.setCredentials(token);

      const calendar = new google.calendar({
        version: "v3",
        auth: oauth2Client,
      });
      return { calendar, oauth2Client };
    } catch (err) {
      throw err;
    }
  },
};
