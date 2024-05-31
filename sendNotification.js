// backend/sendNotification.js

const admin = require('firebase-admin');

function sendPushNotification(token, title, body, link) {
  const message = {
    data: {
      title: title,
      body: body,
      link: link,
    },
    token: token,
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}

module.exports = sendPushNotification;
