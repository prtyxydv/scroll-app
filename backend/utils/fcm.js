const admin = require('firebase-admin');

// Note: To use this in production, you need a serviceAccountKey.json file from Firebase Console
// For this prototype, we'll implement a fallback that logs to console if credentials aren't found.

let fcmInitialized = false;

try {
  // const serviceAccount = require("./serviceAccountKey.json");
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });
  // fcmInitialized = true;
  console.log('FCM placeholder: Set up serviceAccountKey.json to enable real push notifications.');
} catch (error) {
  console.log('FCM Initialization failed (expected for prototype):', error.message);
}

exports.sendPushNotification = async (title, message) => {
  console.log(`[PUSH NOTIFICATION] Sending: "${title}" - "${message}" to all users`);
  
  if (!fcmInitialized) {
    return { success: true, message: 'Notification logged (FCM not configured)' };
  }

  const payload = {
    notification: {
      title,
      body: message,
    },
    topic: 'news',
  };

  try {
    const response = await admin.messaging().send(payload);
    return { success: true, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
