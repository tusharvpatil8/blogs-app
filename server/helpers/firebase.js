const admin = require("firebase-admin");
// const app = initializeApp();
const serviceAccount = require("./xpressfly-7e804-firebase-adminsdk-qbqas-6b0256c028.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


/**
 * Sends a notification to a specific device using its token.
 * first get the device token of the device you want to send the notification to from client side.
 *
 * @param {string} deviceToken - The token of the device to send the notification to.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body of the notification.
 */
function sendNotification(deviceToken, title, body) {
  // Create the message object with the notification details
  const message = {
    notification: {
      title: title, // The title of the notification
      body: body, // The body of the notification
    },
    token: deviceToken, // The token of the device to send the notification to
  };

  // Send the notification
  admin
    .messaging()
    .send(message)
    .then(() => {
      // Log a success message if the notification is sent successfully
      console.log("Notification sent successfully");
    })
    .catch((error) => {
      // Log an error message if there is an error sending the notification
      console.error("Error sending notification:", error);
    });
}

async function sendNotificationToBulk(tokens, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens,
  };

  // Send the notification
  admin
    .messaging()
    .sendEachForMulticast(message)
    .then(() => {
      console.log("Notification sent successfully");
      return true;
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      return false;
    });
}
module.exports = { sendNotification, sendNotificationToBulk };
