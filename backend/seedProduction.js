require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const News = require('./models/News');

const admins = [
  { email: 'sarah.editor@scroll.com', password: 'password123', role: 'admin' },
  { email: 'mike.tech@scroll.com', password: 'password123', role: 'admin' },
  { email: 'alex.finance@scroll.com', password: 'password123', role: 'admin' },
  { email: 'prtyx2695@gmail.com', password: 'password123', role: 'admin' }
];

const newsData = [
  // TECH
  { title: "AI Models Now Outperform Doctors in ER Diagnoses", summary: "A landmark 2026 study shows specialized LLMs achieving 98% accuracy in triage, sparking global medical liability debates.", whyItMatters: "The integration of AI in healthcare is transitioning from assistant to primary diagnostic tool.", category: "Tech" },
  { title: "Apple Q1 2026: AI Integration Drives Record Hardware Sales", summary: "Apple's 'Intelligence First' strategy pays off with a 15% surge in iPhone 17 Pro sales featuring dedicated neural cores.", whyItMatters: "Consumer adoption of on-device AI is becoming the primary driver for hardware upgrades.", category: "Tech" },
  { title: "Boston Dynamics Robotics Exodus Signals Shift to Military", summary: "Major leadership departures at the robotics pioneer suggest a pivot toward industrial and defense applications over consumer use.", whyItMatters: "The robotics industry is moving from 'viral videos' to high-stakes functional deployment.", category: "Tech" },
  { title: "Quantum Supremacy Achieved in Commercial Cloud Systems", summary: "Google and IBM announce the first stable quantum computing instances available for enterprise chemical simulation.", whyItMatters: "Drug discovery and materials science will accelerate by orders of magnitude this decade.", category: "Tech" },
  { title: "OpenAI 'GPT-6' Training Rumors Swirl Amid Energy Crunch", summary: "Reports indicate the next-gen model requires dedicated small modular reactors (SMRs) to sustain compute power.", whyItMatters: "AI development is becoming as much about energy infrastructure as it is about algorithms.", category: "Tech" },

  // BUSINESS
  { title: "NY Fed Confirms U.S. Economy is Officially 'K-Shaped'", summary: "New data shows top 10% of earners seeing 20% wealth growth while bottom 50% face declining real wages due to housing costs.", whyItMatters: "Economic policy will need to pivot toward affordability to prevent social fragmentation.", category: "Business" },
  { title: "Spirit Airlines to Liquidate After Failed Merger Talks", summary: "The low-cost carrier is preparing to shut down operations by June 2026, leaving a massive hole in budget air travel.", whyItMatters: "Reduced competition will likely lead to higher domestic airfares across the board.", category: "Business" },
  { title: "Disney Shelves ESPN Spinoff Plans for Direct Streaming Integration", summary: "CEO Bob Iger confirms ESPN will remain a core part of the Disney ecosystem, fully moving to DTC by 2027.", whyItMatters: "The cable bundle's final anchor is officially moving to the internet.", category: "Business" },
  { title: "Amazon Reaches 10,000 Delivery Drones in Active Use", summary: "The retail giant expands 30-minute delivery to 50 major U.S. cities using its Prime Air Mk30 fleet.", whyItMatters: "The 'last-mile' logistics game has been fundamentally changed by automation.", category: "Business" },
  { title: "Global Luxury Market Slumps as Gen Z Pivots to Experience", summary: "Designer brands report a 12% drop in sales as young consumers prioritize travel and wellness over physical goods.", whyItMatters: "Brands must adapt to a post-materialist economy focused on 'shareable' experiences.", category: "Business" },

  // FINANCE
  { title: "U.S. National Debt Surpasses 130% of GDP", summary: "A historic milestone as interest payments on debt now exceed the annual defense budget.", whyItMatters: "Fiscal sustainability will be the defining political challenge of the next five years.", category: "Finance" },
  { title: "Japan Ends Zero-Rate Era, Yen Surges Globally", summary: "The Bank of Japan raises rates to 1% for the first time in 20 years, disrupting global carry trades.", whyItMatters: "A stronger Yen will impact Japanese exports and global bond market liquidity.", category: "Finance" },
  { title: "BlackRock Launches First Tokenized Real Estate Fund", summary: "Investors can now buy fractional shares of commercial properties on-chain with 24/7 liquidity.", whyItMatters: "Real estate is being democratized and financialized in a way never before possible.", category: "Finance" },
  { title: "The 4-Day Work Week Becomes Law in Iceland & UAE", summary: "Productivity data shows no decline, prompting EU nations to consider similar mandatory legislation.", whyItMatters: "The traditional 40-hour work week is facing its biggest threat in a century.", category: "Finance" },
  { title: "Eurozone Inflation Dips to 1.8% as Energy Costs Stabilize", summary: "The ECB prepares for a series of rate cuts as the continent navigates away from the energy crisis.", whyItMatters: "A return to low interest rates could spark a new cycle of growth in European tech.", category: "Finance" },

  // CRYPTO
  { title: "Truth Social Spinout Signals Trump's 'Truth.Fi' Crypto Ambitions", summary: "TMTG to focus entirely on decentralized finance and a Bitcoin treasury following the social media exit.", whyItMatters: "Politicized finance is becoming a major force in the crypto market.", category: "Crypto" },
  { title: "CME Group to Launch 24/7 Crypto Futures Trading", summary: "The exchange giant moves to eliminate 'weekend gaps' by aligning with the always-on nature of digital assets.", whyItMatters: "Institutional infrastructure is finally matching the speed of native crypto markets.", category: "Crypto" },
  { title: "Ethereum L2s Now Handle 100,000 Transactions Per Second", summary: "Following the 'Pectra' upgrade, Ethereum has effectively solved the scalability trilemma for global finance.", whyItMatters: "The infrastructure is now ready for mass-market consumer applications.", category: "Crypto" },
  { title: "Dubai Becomes First City to Accept Crypto for All Government Fees", summary: "Residents can now pay everything from utility bills to parking fines in stablecoins or BTC.", whyItMatters: "Clear regulation and state adoption are making the UAE the global capital of crypto.", category: "Crypto" },
  { title: "SEC Approves First Solana Spot ETF", summary: "The move signals that the 'Big Three' (BTC, ETH, SOL) are now officially recognized as institutional commodities.", whyItMatters: "Capital inflows to the Solana ecosystem are expected to reach $10B by year-end.", category: "Crypto" },

  // WORLD
  { title: "hostilities Terminated in U.S.-Iran Standoff", summary: "President Trump declares a breakthrough in peace talks, though a U.S. blockade remains in effect for now.", whyItMatters: "The risk of global energy disruption has significantly decreased this month.", category: "World" },
  { title: "Sixty Nations Sign Landmark 2026 Climate Accord", summary: "The deal mandates the use of AI for emissions monitoring and high-tech carbon capture deployment.", whyItMatters: "Technology is now at the center of the global response to climate change.", category: "World" },
  { title: "Russia Implements 'Sovereign Internet' Crackdown", summary: "Global backlash grows as Moscow effectively isolates its domestic web from the international backbone.", whyItMatters: "The 'Splinternet' is becoming a reality, impacting global communication and trade.", category: "World" },
  { title: "India Surpasses China as the World's Manufacturing Hub", summary: "New data shows Apple and Tesla moving 40% of their supply chain to the subcontinent.", whyItMatters: "A massive geopolitical and economic shift is underway in the Indo-Pacific region.", category: "World" },
  { title: "The First Permanent Base on the Moon Nears Completion", summary: "Artemis III mission crews report 90% completion of the Shackleton Crater research station.", whyItMatters: "Humanity is officially becoming a multi-planetary species.", category: "World" },

  // SPORTS
  { title: "2026 World Cup Logistics: Train Tickets to Games Hit $150", summary: "Commuter backlash grows as transport costs for the U.S.-hosted tournament threaten to alienate local fans.", whyItMatters: "Infrastructure and accessibility remain the biggest hurdles for the world's largest sports event.", category: "Sports" },
  { title: "NFL Draft 2026: AI Scouting Reports Replace Traditional GMs", summary: "Three teams reportedly used neural-network-driven simulations to make their first-round picks.", whyItMatters: "Data science is completely rewriting the playbook for talent evaluation.", category: "Sports" },
  { title: "Formula 1 Announces 100% Sustainable Fuel Transition for 2026", summary: "The sport aims to be carbon neutral while maintaining its high-performance ICE technology.", whyItMatters: "Motorsport is becoming a laboratory for future green transport solutions.", category: "Sports" },
  { title: "NBA to Expand to Las Vegas and Seattle by 2027", summary: "Commissioner Silver confirms the league is ready for its first expansion in 20 years.", whyItMatters: "The business of basketball continues to grow despite a fragmenting media landscape.", category: "Sports" },
  { title: "First Pro 'Robot vs Human' Soccer Match Scheduled for December", summary: "Advanced humanoids from Tesla and Boston Dynamics to take on a team of retired stars.", whyItMatters: "The line between entertainment and tech demonstration is blurring.", category: "Sports" },

  // STARTUPS
  { title: "The 'Solo Unicorn' Era Begins", summary: "A startup founder in London reaches a $1B valuation with zero full-time employees, using an autonomous AI workforce.", whyItMatters: "The very definition of a 'company' is being rewritten by automation.", category: "Startups" },
  { title: "Tech Week Boston Debuts with $2B in VC Commitments", summary: "The inaugural event cements the city's status as the world's biotech and robotics capital.", whyItMatters: "Innovation hubs are becoming more specialized and more capital-intensive.", category: "Startups" },
  { title: "Nuclear Fusion Startup Hits 'Net Energy' Milestone", summary: "A MIT spinoff achieves 10 seconds of sustained fusion, promising unlimited clean power by 2035.", whyItMatters: "The ultimate solution to the energy crisis is moving from theory to reality.", category: "Startups" },
  { title: "Space-Based Manufacturing Startup Launches First Orbiting Lab", summary: "The firm aims to produce ultra-pure fiber optics and pharmaceuticals in zero-gravity.", whyItMatters: "A new multi-billion dollar economy is opening up 400km above the Earth.", category: "Startups" },
  { title: "Direct-to-Brain Interface Startup Enters Human Trials", summary: "The tech allows for 'silent typing' and direct data upload for individuals with paralysis.", whyItMatters: "The final frontier of human-computer interaction is being crossed.", category: "Startups" }
];

const seedProduction = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for Production Seeding...');

    // Clear existing
    await News.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    // Create Admins
    const createdAdmins = [];
    for (const adminData of admins) {
      const user = new User(adminData);
      // pre-save hook will handle password hashing
      await user.save();
      createdAdmins.push(user);
      console.log(`Admin created: ${user.email}`);
    }

    // Seed News with random admins
    const newsToInsert = newsData.map(item => {
      const randomAdmin = createdAdmins[Math.floor(Math.random() * createdAdmins.length)];
      return {
        ...item,
        postedBy: randomAdmin._id,
        likesCount: Math.floor(Math.random() * 200),
        bookmarksCount: Math.floor(Math.random() * 100),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random dates within last 30 days
      };
    });

    await News.insertMany(newsToInsert);
    console.log(`Successfully seeded ${newsToInsert.length} high-quality articles.`);
    
    process.exit();
  } catch (err) {
    console.error('Production Seed error:', err);
    process.exit(1);
  }
};

seedProduction();
