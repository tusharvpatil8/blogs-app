const { exec } = require("child_process");
const cron = require("node-cron");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const LIMIT = 25;
const databaseURL = process.env.MONGODB_URI; // Replace with your MongoDB connection URL


//call following function from server file to take backup of your db regularly
module.exports.backupDb = async () => {
  try {
    cron.schedule("0 0 * * *", () => {
      console.log("running backup every 24 hours");
      takeBackup(24);
    });
    cron.schedule("0 * * * *", () => {
      console.log("running backup every hour");
      takeBackup(3);
    });
  } catch (err) {
    console.error("Error countered while backing up database.");
  }
};

/**
 * Function to take backup of the database at specified intervals.
 * It performs the backup using the `mongodump` command and uploads the backup to S3.
 * @param {number} timing - The interval at which the backup should be taken (in hours).
 */
const takeBackup = async (timing) => {
  // Specify the backup directory
  const backupDirectory = "./backups";

  // Generate the backup folder name and path based on the timing
  let backupFolderName, backupFolderPath;
  if (timing == 24) {
    backupFolderName = `database_backup_${moment().format("YYYYMMDD-HHmmss")}`;
    backupFolderPath = `${backupDirectory}/${backupFolderName}`;
  } else {
    backupFolderName = `hourlybackup`;
    backupFolderPath = `${backupDirectory}/${backupFolderName}`;
  }

  // Use the mongodb-backup command to perform the backup
  const command = `mongodump --uri=${databaseURL} --gzip -o ${backupFolderPath}`;
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${error.message}`);
    } else {
      console.log(
        `Backup successful. File saved at: ${backupFolderPath} , now uploading to S3.`
      );

      // Zip the backup folder
      const filePath = `${backupFolderPath}.zip`;
      const fileName = `${backupFolderName}.zip`;
      const zippedFolder = await zipFolder(backupFolderPath, filePath).catch(
        (err) => {
          console.log(err);
        }
      );
      console.log(`zipped folder: ${zippedFolder}`);

      // Read the zipped file
      const fileData = fs.readFileSync(filePath);

      // Upload the backup to S3
      const uploadToS3 = await uploadBackupToAWS(fileData, path, fileName);
      if (uploadToS3?.status == false) {
        console.log("Error uploading backup to S3.");
        return;
      } else {
        console.log("file uploaded", uploadToS3.data);

        // Delete the local backup file
        const deleteLocalFile = fs.unlinkSync(filePath);
      }
    }
  });
};

function zipFolder(sourceFolder, zipFilePath) {
  return new Promise((resolve, reject) => {
    // Construct the shell command
    const command = `zip -r ${zipFilePath} ${sourceFolder}`;
    // Execute the shell command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error zipping folder: ${stderr || stdout}`);
      } else {
        fs.rmSync(sourceFolder, { recursive: true, force: true });
        resolve(`Folder zipped successfully: ${zipFilePath}`);
      }
    });
  });
}

const uploadBackupToAWS = (fileData, path, fileName) => {
  // console.log("fileData: " + fileData);
  return new Promise(async (resolve) => {
    const contentType = fileData.mimetype;
    const ContentEncoding = fileData.encoding;
    const fileNameAWS = fileName;
    const awsConfig = {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    };
    AWS.config.update(awsConfig);
    const awsKey = path + fileNameAWS;
    const s3 = new AWS.S3();
    const fileContent = Buffer.from(fileData, "binary");
    // Setting up S3 upload parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: awsKey, // File name you want to save as in S3
      Body: fileContent,
      ContentEncoding: ContentEncoding,
      ContentType: contentType,
    };
    s3.upload(params, function (err, data) {
      if (err)
        return resolve({
          status: false,
          message: "Error uploading file on s3.",
        });
      return resolve({ status: true, data: data.Location });
    });
  });
};
