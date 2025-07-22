const { v4: uuidv4 } = require("uuid");
const randomString = require("randomstring");
const CryptoJs = require("crypto-js");
// const {
//   CLIENT_HOST,
//   AGORA_APP_ID,
//   AGORA_CERTIFICATE_KEY,
// } = require("../constants/env.constant");

module.exports = {
  // -------------- Sync Helpers --------------------------------------------------------
  generateUniqueID: () => {
    const uuid = uuidv4();
    const uniqueId = uuid.replace(/-/g, "");
    return uniqueId;
  },
  // generateOTP: () => {
  //   let otp = "";
  //   for (let i = 0; i < 6; i++) {
  //     otp += Math.floor(Math.random() * 10);
  //   }
  //   otp = Number(otp);
  //   return otp;
  // },
  // generateRandomString: (length) => {
  //   let string = randomString.generate(length);
  //   return string;
  // },
  // generateAgoraAuthorizationToken: () => {
  //   try {
  //     const timestamp = Math.floor(Date.now() / 1000);
  //     const nonce = Math.floor(Math.random() * 100000);
  //     const signature = CryptoJs.HmacSHA1(
  //       `${AGORA_APP_ID}:${timestamp}:${nonce}`,
  //       AGORA_CERTIFICATE_KEY
  //     ).toString(CryptoJs.enc.Hex);

  //     const authorizationToken = Buffer.from(signature).toString("base64");

  //     if (!authorizationToken) {
  //       return {
  //         success: false,
  //         authorizationToken: null,
  //       };
  //     }

  //     return {
  //       success: true,
  //       authorizationToken: authorizationToken,
  //     };
  //   } catch (err) {
  //     console.log("🚀 ~ err:", err);
  //     return {
  //       success: false,
  //       authorizationToken: null,
  //     };
  //   }
  // },

  // -------------- Async Helpers -------------------------------------------------------
  // generateURLString: (config) => {
  //   return new Promise((resolve) => {
  //     try {
  //       const url = new URL(config?.origin || CLIENT_HOST);

  //       if (config.hasOwnProperty("queryParams")) {
  //         const { queryParams } = config;

  //         if (queryParams.length > 0) {
  //           for (let i = 0; i < queryParams.length; i++) {
  //             let queryKey = queryParams[i]["queryKey"];
  //             let queryValue = queryParams[i]["queryValue"];
  //             url.searchParams.set(queryKey, queryValue);
  //           }
  //         }
  //       }

  //       if (config.hasOwnProperty("params")) {
  //         const { params } = config;
  //         url.pathname += params;
  //       }

  //       return resolve({
  //         success: true,
  //         data: url,
  //         message: "URL Created Successfully",
  //       });
  //     } catch (err) {
  //       console.log("🚀 ~ returnnewPromise ~ err:", err);
  //       return resolve({
  //         success: false,
  //         data: null,
  //         message: `Failed To Generate URL : ${err}`,
  //       });
  //     }
  //   });
  // },
};
