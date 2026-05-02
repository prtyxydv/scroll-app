const fs = require('fs');
const path = require('path');
const { summarizeArticle } = require('../utils/summarizer');

// Path to mock data
const articlesPath = path.join(__dirname, '../data/articles.json');

/**
 * Service to handle news logic.
 */
class NewsService {
  constructor() {
    this.articles = this._loadArticles();
  }

  // Load raw articles from JSON file
  _loadArticles() {
    try {
      const data = fs.readFileSync(articlesPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading articles:', error);
      return [];
    }
  }

  /**
   * Get paginated and filtered articles.
   * @param {string} category - Category to filter by
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   */
  getArticles(category, page = 1, limit = 5) {
    let filtered = this.articles;

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginated = filtered.slice(startIndex, endIndex);

    // Transform into structured format
    return paginated.map(summarizeArticle);
  }

  /**
   * Get a daily summary (all articles for today).
   */
  getDailySummary() {
    // For this mock, we'll just return the first 5 articles as "today's" news
    return this.articles.slice(0, 5).map(summarizeArticle);
  }

  /**
   * Generate a simple MCQ quiz based on a random article.
   */
  generateQuiz() {
    const randomArticle = this.articles[Math.floor(Math.random() * this.articles.length)];
    const structured = summarizeArticle(randomArticle);

    // Human-sounding quiz generation
    return {
      question: `Quick check: What's the main focus of the story about "${structured.title}"?`,
      options: ['Tech', 'Business', 'World', 'Finance'],
      correctAnswer: structured.category,
      context: structured.summary,
      funFact: "Did you know? Most people forget 80% of what they read within 24 hours. Quizzes like this help it stick!"
    };
  }
}

module.exports = new NewsService();
