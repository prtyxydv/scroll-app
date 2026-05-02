require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, 'email role');
    console.log('--- Current Users in DB ---');
    users.forEach(u => console.log(`- ${u.email} (${u.role})`));
    process.exit();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

listUsers();
