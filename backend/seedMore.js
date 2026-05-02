require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

const newsData = [
  {
    title: "The Future of Education: AI in the Classroom",
    summary: "New tools are helping students learn faster, but teachers worry about critical thinking.",
    whyItMatters: "Education is the foundation of awareness; how we learn is changing forever.",
    category: "Tech"
  },
  {
    title: "Sustainable Fashion: More Than Just a Trend",
    summary: "How students are leading the charge against fast fashion and promoting thrift culture.",
    whyItMatters: "Individual choices impact global supply chains and environmental health.",
    category: "World"
  },
  {
    title: "Mental Health on Campus: A Growing Priority",
    summary: "Universities are expanding counseling services as students speak out about burnout.",
    whyItMatters: "Awareness of mental well-being is crucial for a healthy, productive society.",
    category: "World"
  },
  {
    title: "Cryptocurrency 101: What Students Need to Know",
    summary: "A basic guide to understanding digital assets and the risks involved in trading.",
    whyItMatters: "Financial literacy is a key pillar of independence for young adults.",
    category: "Finance"
  },
  {
    title: "The Rise of Solo Travel Among Gen Z",
    summary: "Why more young people are choosing to explore the world alone and how to do it safely.",
    whyItMatters: "Travel broadens perspective and fosters cross-cultural understanding.",
    category: "World"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    // Don't delete existing ones, just add more
    await News.insertMany(newsData);
    console.log('Successfully added 5 more news items.');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
