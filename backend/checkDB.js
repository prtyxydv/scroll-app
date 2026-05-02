require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await News.countDocuments();
    console.log(`Total news articles in DB: ${count}`);
    const latest = await News.find().limit(1);
    console.log('Latest article:', latest[0]?.title);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkDB();
