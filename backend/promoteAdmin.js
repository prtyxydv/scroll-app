require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const promoteUser = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scroll-news');
    console.log('Connected to DB for promotion...');
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: 'admin' },
      { new: true }
    );
    if (user) {
      console.log(`Successfully promoted ${email} to admin.`);
    } else {
      console.log(`User ${email} not found.`);
    }
    process.exit();
  } catch (err) {
    console.error('Promotion error:', err);
    process.exit(1);
  }
};

promoteUser('prtyx2695@gmail.com');
