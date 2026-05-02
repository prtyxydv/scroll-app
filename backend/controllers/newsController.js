const News = require('../models/News');
const User = require('../models/User');

// GET /api/news (Personalized & Paginated)
exports.getNews = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const user = await User.findById(req.user?._id);
    const categoryInteractions = user?.categoryInteractions || new Map();
    
    // Convert Map to object for aggregation if needed, or handle in pipeline
    const interactionWeights = {};
    if (categoryInteractions instanceof Map) {
      categoryInteractions.forEach((val, key) => {
        interactionWeights[key] = val;
      });
    }

    const pipeline = [];

    // Filter by category if provided
    if (category && category !== 'All') {
      pipeline.push({ $match: { category } });
    }

    // Advanced Personalization Logic
    const branches = Object.keys(interactionWeights).map(cat => ({
      case: { $eq: ['$category', cat] },
      then: interactionWeights[cat] || 0
    }));

    pipeline.push({
      $addFields: {
        interactionWeight: branches.length > 0 
          ? { $switch: { branches, default: 0 } }
          : 0,
        // Freshness score: Exponential decay (simplified)
        // Score decreases as time passes from createdAt
        freshnessScore: {
          $divide: [
            1,
            { $add: [1, { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 3600000] }] } // decay per hour
          ]
        }
      }
    });

    // Final Score: Weight + Freshness
    pipeline.push({
      $addFields: {
        totalScore: { $add: ['$interactionWeight', { $multiply: ['$freshnessScore', 5] }] }
      }
    });

    pipeline.push({ $sort: { totalScore: -1, createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });

    const news = await News.aggregate(pipeline);
    // Manually populate postedBy since aggregate doesn't do it automatically easily
    const populatedNews = await News.populate(news, { path: 'postedBy', select: 'email' });
    res.json(populatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/news/trending
exports.getTrendingNews = async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          // trendScore = (likes * 2) + (bookmarks * 3) + freshness
          trendScore: {
            $add: [
              { $multiply: ['$likesCount', 2] },
              { $multiply: ['$bookmarksCount', 3] },
              {
                $multiply: [
                  {
                    $divide: [
                      1,
                      { $add: [1, { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 3600000] }] }
                    ]
                  },
                  10 // Freshness boost
                ]
              }
            ]
          }
        }
      },
      { $sort: { trendScore: -1 } },
      { $limit: 10 }
    ];

    const trending = await News.aggregate(pipeline);
    const populatedTrending = await News.populate(trending, { path: 'postedBy', select: 'email' });
    res.json(populatedTrending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/news (ADMIN ONLY)
exports.createNews = async (req, res) => {
  const { title, summary, whyItMatters, category } = req.body;
  try {
    const news = await News.create({ 
      title, 
      summary, 
      whyItMatters, 
      category,
      postedBy: req.user._id 
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/news/:id (ADMIN ONLY)
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/news/:id (ADMIN ONLY)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/news/:id/like
exports.toggleLike = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    
    if (!news) return res.status(404).json({ message: 'News not found' });

    const index = user.likedNews.indexOf(newsId);
    let liked = false;

    if (index > -1) {
      user.likedNews.splice(index, 1);
      news.likesCount = Math.max(0, news.likesCount - 1);
      liked = false;
    } else {
      user.likedNews.push(newsId);
      news.likesCount += 1;
      liked = true;

      // Update personalization interaction
      const currentVal = user.categoryInteractions.get(news.category) || 0;
      user.categoryInteractions.set(news.category, currentVal + 1);
    }

    await user.save();
    await news.save();
    res.json({ liked, likesCount: news.likesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/bookmark/:newsId
exports.toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newsId = req.params.newsId;
    const news = await News.findById(newsId);

    if (!news) return res.status(404).json({ message: 'News not found' });

    const index = user.bookmarks.indexOf(newsId);
    let bookmarked = false;

    if (index > -1) {
      user.bookmarks.splice(index, 1);
      news.bookmarksCount = Math.max(0, news.bookmarksCount - 1);
      bookmarked = false;
    } else {
      user.bookmarks.push(newsId);
      news.bookmarksCount += 1;
      bookmarked = true;

      // Update personalization interaction (bookmarks weigh more)
      const currentVal = user.categoryInteractions.get(news.category) || 0;
      user.categoryInteractions.set(news.category, currentVal + 2);
    }

    await user.save();
    await news.save();
    res.json({ bookmarked, bookmarksCount: news.bookmarksCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/news/analytics (ADMIN ONLY)
exports.getAnalytics = async (req, res) => {
  try {
    const stats = await News.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: '$likesCount' },
          totalBookmarks: { $sum: '$bookmarksCount' },
          totalArticles: { $sum: 1 }
        }
      }
    ]);

    const topTrending = await News.find().sort({ likesCount: -1, bookmarksCount: -1 }).limit(5);

    res.json({
      stats: stats[0] || { totalLikes: 0, totalBookmarks: 0, totalArticles: 0 },
      topTrending
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
