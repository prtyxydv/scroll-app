require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

const newsData = [
  {
    title: "NVIDIA Unveils Next-Gen Blackwell AI Chips",
    summary: "The tech giant revealed a new architecture that promises 30x performance gains for LLM inference.",
    whyItMatters: "This solidifies NVIDIA's dominance in the AI hardware race and could lower the cost of running models like GPT-5.",
    category: "Tech"
  },
  {
    title: "Federal Reserve Holds Rates Steady Again",
    summary: "Inflation remains stubborn, leading the Fed to maintain current interest rates at its latest meeting.",
    whyItMatters: "High rates mean borrowing costs for houses and cars will stay elevated for the foreseeable future.",
    category: "Finance"
  },
  {
    title: "Global Heat Records Smashed in April",
    summary: "New data shows this April was the hottest on record, continuing a 10-month streak of global temperature peaks.",
    whyItMatters: "Urgent climate action is needed as the world approaches the 1.5C warming threshold faster than expected.",
    category: "World"
  },
  {
    title: "SpaceX Starship Completes Third Test Flight",
    summary: "The world's largest rocket reached orbital velocity for the first time before breaking up upon reentry.",
    whyItMatters: "Despite the loss of the vehicle, the mission achieved key milestones for NASA's Artemis moon program.",
    category: "Tech"
  },
  {
    title: "Apple Announces New iPad Pro with M4 Chip",
    summary: "The latest tablet features a stunning 'Tandem OLED' display and the most powerful chip Apple has ever made.",
    whyItMatters: "Apple is positioning the iPad as a true AI-first device, jumping ahead of the Mac in silicon generation.",
    category: "Tech"
  },
  {
    title: "Bitcoin Halving Successfully Completed",
    summary: "The quadrennial event has cut the daily production of new Bitcoin in half, tightening the asset's supply.",
    whyItMatters: "Historically, halving events precede significant price rallies, though market conditions are different this time.",
    category: "Finance"
  },
  {
    title: "EU Passes Landmark Artificial Intelligence Act",
    summary: "The world's first comprehensive AI law classifies systems by risk level and bans certain high-risk applications.",
    whyItMatters: "This sets a global regulatory standard that big tech companies must follow to operate in Europe.",
    category: "World"
  },
  {
    title: "Tesla Cutting 10% of Global Workforce",
    summary: "Elon Musk cites 'duplication of roles' and the need for cost reduction amid slowing EV demand.",
    whyItMatters: "The layoffs signal a challenging period for the EV market as competition from China intensifies.",
    category: "Business"
  },
  {
    title: "Microsoft Invests $1.5 Billion in UAE AI Firm G42",
    summary: "The deal includes a seat on the board for Microsoft's Brad Smith and a shift away from Chinese hardware.",
    whyItMatters: "This reflects the growing geopolitical importance of AI partnerships and US-UAE tech ties.",
    category: "Tech"
  },
  {
    title: "Global Trade Rebounding Faster Than Predicted",
    summary: "The WTO reports a surge in goods trade despite ongoing tensions in the Red Sea and Panama Canal.",
    whyItMatters: "A resilient global supply chain could help ease inflation and support economic growth in 2024.",
    category: "Business"
  },
  {
    title: "New Alzheimer's Drug Shows Promise in Phase 3",
    summary: "A clinical trial for the drug 'Donanemab' showed it significantly slowed cognitive decline in early patients.",
    whyItMatters: "This could become the second approved treatment to target the underlying cause of the disease.",
    category: "World"
  },
  {
    title: "Google Integrates AI Overviews into Search",
    summary: "The search giant is rolling out AI-generated summaries at the top of results for millions of users.",
    whyItMatters: "This marks the biggest change to Google Search in decades and could disrupt web traffic for publishers.",
    category: "Tech"
  },
  {
    title: "Gold Prices Hit All-Time High Amid Uncertainty",
    summary: "Investors are flocking to the safe-haven asset as central banks increase their reserves and inflation persists.",
    whyItMatters: "Rising gold prices often signal a lack of confidence in traditional currencies and economic stability.",
    category: "Finance"
  },
  {
    title: "Japan Ends Negative Interest Rate Policy",
    summary: "The Bank of Japan raised rates for the first time in 17 years, ending a long era of ultra-loose monetary policy.",
    whyItMatters: "This shift impacts global capital flows as Japanese investors may move money back home.",
    category: "Finance"
  },
  {
    title: "Disney and Reliance Merge Indian Media Assets",
    summary: "The $8.5 billion deal creates a media powerhouse that will dominate the world's most populous market.",
    whyItMatters: "The merger consolidates streaming and TV rights, including the highly lucrative IPL cricket coverage.",
    category: "Business"
  },
  {
    title: "Researchers Create World's First 6G Prototype",
    summary: "Engineers in Japan achieved data speeds 20 times faster than current 5G technology in a successful trial.",
    whyItMatters: "While years away, 6G could enable real-time holographic communication and advanced autonomous systems.",
    category: "Tech"
  },
  {
    title: "United Nations Approves First Global AI Resolution",
    summary: "The General Assembly adopted a US-led resolution to ensure AI is 'safe, secure and trustworthy'.",
    whyItMatters: "It represents a rare moment of global consensus on the need to govern emerging technologies.",
    category: "World"
  },
  {
    title: "Reddit Goes Public on New York Stock Exchange",
    summary: "The social media platform's shares surged on their debut, valuing the company at over $6 billion.",
    whyItMatters: "The successful IPO could reopen the door for other tech startups waiting to go public.",
    category: "Business"
  },
  {
    title: "New Solid-State Battery Breakthrough for EVs",
    summary: "A startup claims its new battery design can charge in 10 minutes and provide a 600-mile range.",
    whyItMatters: "Solid-state batteries are the 'holy grail' for EVs, potentially solving range anxiety and safety issues.",
    category: "Tech"
  },
  {
    title: "Oil Prices Dip as Supply Concerns Ease",
    summary: "Crude prices fell after US inventories rose more than expected and geopolitical tensions stabilized.",
    whyItMatters: "Lower oil prices could provide a much-needed cooling effect on global energy costs and inflation.",
    category: "Finance"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scroll-news');
    console.log('Connected to MongoDB for seeding...');
    await News.deleteMany({});
    await News.insertMany(newsData);
    console.log('Successfully seeded 20 news items.');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
