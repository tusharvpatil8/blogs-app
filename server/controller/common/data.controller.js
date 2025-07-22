const commonFunction = require("../../helpers/commonFunctions");

// Request encode Data
module.exports = {
  encodeData: async (req, res) => {
    try {
      console.log("sfddegegr")
      const ciphertext = await commonFunction.encode(req?.body);
      return res.json(ciphertext);
    } catch (error) {
      return res.json({
        status: false,
        message: `There seems to be an issue with encoding the data. Please try again.`,
        error: error,
      });
    }
  },

  // Request decode Data
  decodeData: async (req, res, next) => {
    try {
      console.log("sfddegegr");

      const encodedData = req?.body;
      const ciphertext = await commonFunction.decode(
        encodedData?.encryptedData?.data
      );

      return res.status(200).json({
        success: true,
        message: "Data decode successfully.",
        data: ciphertext,
      });
    } catch (err) {
      next(err);
    }
  },

  encryptionPlainData: async (req, res, next) => {
    try {
      const reqData = req.body;

      const decryptedData = await commonFunction.encryptData(reqData);
      return res.json({
        success: true,
        message: "Success",
        data: decryptedData,
      });
    } catch (err) {
      next(err);
    }
  },
  decryptionPlainData: async (req, res, next) => {
    try {
      const reqData = req.body;

      const decryptedData = await commonFunction.decryptData(reqData);

      return res.json({
        success: true,
        message: "Success",
        data: decryptedData,
      });
    } catch (err) {
      next(err);
    }
  },
};
