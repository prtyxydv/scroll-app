const express = require('express');
const router = express.Router();
const { sendPushNotification } = require('../utils/fcm');
const { protect, admin } = require('../middleware/auth');
const Notification = require('../models/Notification');

router.post('/', protect, admin, async (req, res) => {
  const { title, message } = req.body;
  try {
    const notification = await Notification.create({ title, message });
    const fcmResponse = await sendPushNotification(title, message);
    res.status(201).json({ notification, fcmResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
