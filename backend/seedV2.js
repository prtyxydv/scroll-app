require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

const newsData = [
  {
    title: "The Future of Quantum Computing",
    summary: "New breakthroughs in stable qubits are bringing commercial quantum advantage closer than ever.",
    whyItMatters: "Quantum computing will disrupt everything from cybersecurity to medicine.",
    category: "Tech",
    likesCount: 45,
    bookmarksCount: 12
  },
  {
    title: "Global Supply Chain Rebound",
    summary: "Logistics bottlenecks are finally clearing up, leading to lower inflation expectations.",
    whyItMatters: "Cheaper goods and stable markets for the upcoming quarter.",
    category: "Business",
    likesCount: 30,
    bookmarksCount: 8
  },
  {
    title: "Bitcoin ETFs See Massive Inflows",
    summary: "Institutional investors are pouring billions into digital assets as regulations clear up.",
    whyItMatters: "Crypto is becoming a legitimate part of institutional portfolios.",
    category: "Crypto",
    likesCount: 120,
    bookmarksCount: 50
  },
  {
    title: "Sustainable Tech Startups on the Rise",
    summary: "Venture capital is shifting focus toward energy storage and carbon capture technologies.",
    whyItMatters: "The next generation of unicorns will likely be green tech companies.",
    category: "Startups",
    likesCount: 60,
    bookmarksCount: 25
  },
  {
    title: "Central Banks Hold Rates Steady",
    summary: "The Fed and ECB signal a 'wait and see' approach as labor markets remain surprisingly strong.",
    whyItMatters: "Interest rates will likely stay 'higher for longer' than markets anticipated.",
    category: "Finance",
    likesCount: 25,
    bookmarksCount: 10
  },
  {
    title: "Renewable Energy Smashes Records",
    summary: "Solar and wind now account for over 30% of global electricity production.",
    whyItMatters: "The transition away from fossil fuels is accelerating faster than predicted.",
    category: "World",
    likesCount: 85,
    bookmarksCount: 30
  }
];

const seedV2 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for V2 seeding...');
    await News.deleteMany({});
    await News.insertMany(newsData);
    console.log('Successfully seeded 6 high-engagement articles.');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedV2();
