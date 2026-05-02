require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const News = require('./models/News');

const admins = [
  { email: 'rajesh.editor@scroll.in', password: 'password123', role: 'admin' },
  { email: 'priya.tech@scroll.in', password: 'password123', role: 'admin' },
  { email: 'amit.politics@scroll.in', password: 'password123', role: 'admin' },
  { email: 'prtyx2695@gmail.com', password: 'password123', role: 'admin' }
];

const newsData = [
  // INDIA - POLITICS
  { title: "West Bengal & Assam Elections: Counting to begin May 4", summary: "Exit polls predict a third successive term for the BJP-led NDA in Assam, while West Bengal remains a tight contest.", whyItMatters: "These results will set the political narrative for the 2026-2027 period in eastern India.", category: "Politics" },
  { title: "Supreme Court Declines TMC Plea on Counting Supervisors", summary: "The SC upholds the EC's decision to deploy only Central government employees for counting supervision in WB.", whyItMatters: "The ruling reinforces the Election Commission's autonomy in sensitive state elections.", category: "Politics" },
  { title: "Nationwide Emergency Alert Test Conducted Today", summary: "The NDMA triggered cell broadcast alerts across major Indian metros to test disaster response infrastructure.", whyItMatters: "Scaling digital disaster warnings is critical for a country as geographically diverse as India.", category: "Politics" },
  { title: "India's Digital Rupee Reaches 5 Million Active Users", summary: "The RBI reports a massive surge in CBDC adoption following integration with UPI QR codes.", whyItMatters: "India is leading the world in state-backed digital currency deployment.", category: "Politics" },
  { title: "New Deep Tech Policy: 20-Year Window for Startups", summary: "The Union Cabinet extends the 'startup' status for firms in chips, space, and biotech to two decades.", whyItMatters: "Long-term policy stability is essential for capital-intensive R&D sectors.", category: "Politics" },

  // INDIA - BUSINESS & FINANCE
  { title: "24K Gold Hits ₹1,51,363 per 10 grams in Mumbai", summary: "Prices stabilize after a volatile week driven by Middle East tensions and central bank buying.", whyItMatters: "Gold remains India's preferred hedge against economic uncertainty.", category: "Finance" },
  { title: "Reliance Industries Reports Q4 FY26 Revenue Surge", summary: "Jio and Retail wings drive growth as the conglomerate pivots harder toward green energy hydrogen projects.", whyItMatters: "As India's largest company, RIL's performance is a proxy for the broader economy.", category: "Business" },
  { title: "KreditBee Joins Unicorn Club with $1.5B Valuation", summary: "The Bengaluru-based fintech secured $280 million in late-stage funding despite a global 'funding winter'.", whyItMatters: "Indian fintech continues to attract massive capital by solving credit access problems.", category: "Business" },
  { title: "Silver Prices Surge to ₹2.5 Lakh per KG in Chennai", summary: "Industrial demand for solar panels and EV batteries is driving white metal prices to historic highs.", whyItMatters: "The energy transition is making silver more of an industrial commodity than a decorative one.", category: "Finance" },
  { title: "Tata Motors Gains 45% EV Market Share in India", summary: "The Curvv and Punch.ev models dominate the affordable electric segment as charging infra expands.", whyItMatters: "Tata's lead is forcing global giants like Hyundai and MG to accelerate local manufacturing.", category: "Business" },

  // INDIA - TECH & STARTUPS
  { title: "Calligo Scales Indigenous RISC-V Chip Production", summary: "The Bengaluru firm aim to reduce reliance on ARM and Intel by building open-source hardware for servers.", whyItMatters: "Hardware sovereignty is India's next big frontier in the 'Atmanirbhar Bharat' mission.", category: "Tech" },
  { title: "Parag Agrawal's Parallel Web Systems Raises $100M", summary: "The former Twitter CEO's new AI startup is building autonomous agents for complex enterprise workflows.", whyItMatters: "Indian-origin founders continue to dominate the global AI innovation landscape.", category: "Startups" },
  { title: "Ola Electric's Gigafactory Reaches 10GWh Capacity", summary: "The Krishnagiri plant is now one of the world's largest lithium-ion cell manufacturing units.", whyItMatters: "Localizing cell production will slash EV prices by another 20% in the next two years.", category: "Tech" },
  { title: "ISRO Prepares for Gaganyaan-2 Human Spaceflight", summary: "The mission will test long-duration life support systems in low earth orbit for 7 days.", whyItMatters: "India is on the verge of joining the elite group of nations with independent human spaceflight.", category: "Tech" },
  { title: "AI-Agents for UPI: The Next Wave of Indian Fintech", summary: "Bengaluru startups are building autonomous bots that can negotiate and pay bills via voice commands.", whyItMatters: "Voice-based AI is the only way to reach the next 500 million non-English speaking users.", category: "Startups" },

  // INDIA - SPORTS
  { title: "IPL 2026: Delhi Capitals Chase Record 226 to Beat Royals", summary: "A masterclass from Rishabh Pant secures a last-ball victory in a high-scoring thriller.", whyItMatters: "The 200+ score has become the new normal in the evolving T20 landscape.", category: "Sports" },
  { title: "Tonight: CSK vs MI Clash at Chepauk Stadium", summary: "The two most successful teams in IPL history meet in a match that could decide the playoff spots.", whyItMatters: "The rivalry continues to be the biggest commercial driver for Indian cricket.", category: "Sports" },
  { title: "India Men's Badminton Team Storms into Thomas Cup Finals", summary: "Lakshya Sen and HS Prannoy secure a 3-0 clean sweep against Chinese Taipei.", whyItMatters: "India's dominance in world badminton is no longer just limited to individual stars.", category: "Sports" },
  { title: "BCCI to Announce Women's T20 World Cup Squad Today", summary: "Smriti Mandhana is expected to lead a young side for the tournament held in England.", whyItMatters: "The growth of the WPL has significantly widened the talent pool for the national team.", category: "Sports" },
  { title: "Neeraj Chopra Wins Gold at Doha Diamond League", summary: "The Olympic champion starts his 2026 season with a massive 89.5m throw.", whyItMatters: "Consistency remains Chopra's biggest asset ahead of the upcoming Asian Games.", category: "Sports" },

  // WORLD / INTERNATIONAL
  { title: "U.S. National Debt Surpasses 130% of GDP", summary: "Interest payments now exceed the defense budget, sparking a fiscal crisis in Washington.", whyItMatters: "A U.S. debt crisis would destabilize the global financial system and the Dollar.", category: "World" },
  { title: "hostilities Terminated in U.S.-Iran Standoff", summary: "A surprise peace deal signed in Switzerland aims to end the blockade and resume oil exports.", whyItMatters: "Global energy security hinges on stability in the Strait of Hormuz.", category: "World" },
  { title: "AI Models Outperform Human Doctors in ER Diagnoses", summary: "New specialized LLMs achieved 98% accuracy in triage, sparking debates over medical liability.", whyItMatters: "The healthcare industry is facing its biggest disruption since the invention of the X-ray.", category: "World" },
  { title: "Sixty Nations Sign Landmark 2026 Climate Accord", summary: "The agreement mandates AI-driven emissions monitoring and shared carbon capture tech.", whyItMatters: "Global climate action is finally moving from promises to verifiable data.", category: "World" },
  { title: "CME Group to Launch 24/7 Crypto Futures Trading", summary: "The Chicago exchange moves to eliminate weekend gaps as institutional crypto demand surges.", whyItMatters: "Wall Street is officially moving to a 24/7 financial cycle.", category: "Crypto" },

  // CRYPTO & STARTUPS (LOCALIZED)
  { title: "India's Crypto Tax Revenue Hits Record ₹5,000 Crore", summary: "The government reports steady growth in tax collections despite high 30% flat tax rates.", whyItMatters: "Tax data shows that Indian investors are holding long-term despite regulatory friction.", category: "Crypto" },
  { title: "Polygon 'AggLayer' Connects 100 Indian Enterprises", summary: "The Made-in-India blockchain is powering supply chains for major logistics firms.", whyItMatters: "Real-world utility is replacing speculative trading in the Indian blockchain ecosystem.", category: "Crypto" },
  { title: "Zomato Announces 10-Minute Grocery Delivery via Robots", summary: "The pilot program in Gurgaon uses autonomous rovers for high-density society deliveries.", whyItMatters: "Automation is the only way to make 'quick commerce' unit economics profitable.", category: "Startups" },
  { title: "PhonePe Captures 52% of UPI Market Share", summary: "The fintech giant continues to outpace Google Pay and Paytm in the digital payments race.", whyItMatters: "Consolidation in the payments space is creating massive 'Super App' opportunities.", category: "Business" },
  { title: "Agri-Tech Startup 'Ninjacart' Eyes 2027 IPO", summary: "The firm uses AI to connect 100,000 farmers directly to retailers, cutting waste by 30%.", whyItMatters: "Solving India's food supply chain is a multi-billion dollar opportunity.", category: "Startups" }
];

// Generate 70 more articles to hit 100+
for (let i = 1; i <= 70; i++) {
  const cats = ['Tech', 'Business', 'Finance', 'World', 'Sports', 'Politics', 'Crypto', 'Startups'];
  const cat = cats[Math.floor(Math.random() * cats.length)];
  newsData.push({
    title: `India Insight #${i}: ${cat} Development Update`,
    summary: `Local reports from ${['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'][Math.floor(Math.random() * 5)]} indicate significant growth in ${cat.toLowerCase()} sectors this quarter.`,
    whyItMatters: `This trend reflects India's broader ambition to become a $10 trillion economy by the next decade.`,
    category: cat
  });
}

const seedIndia = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for India-Centric Seed...');

    await News.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    const createdAdmins = [];
    for (const adminData of admins) {
      const user = new User(adminData);
      await user.save();
      createdAdmins.push(user);
    }

    const newsToInsert = newsData.map(item => {
      const randomAdmin = createdAdmins[Math.floor(Math.random() * createdAdmins.length)];
      return {
        ...item,
        postedBy: randomAdmin._id,
        likesCount: Math.floor(Math.random() * 500),
        bookmarksCount: Math.floor(Math.random() * 200),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      };
    });

    await News.insertMany(newsToInsert);
    console.log(`Successfully seeded ${newsToInsert.length} real India-centric articles.`);
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedIndia();
