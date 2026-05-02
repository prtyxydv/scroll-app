/**
 * Utility to transform raw news data into a human, engaging format.
 * No corporate jargon. Smart, conversational, and simple.
 */

const summarizeArticle = (article) => {
  // We use the fields directly from our 'smart' mock data if they exist,
  // otherwise we provide a fall-back that still follows the new tone rules.
  
  return {
    id: article.id,
    title: article.title,
    category: article.category,
    // Keep it short and punchy
    summary: article.rawContent,
    // Real-world, practical impact
    whyItMatters: article.why || `This is a big deal for ${article.category} because it changes how we'll interact with technology in our daily lives.`,
    // Short and powerful
    takeaway: article.takeaway || `Keep an eye on this—it's changing the game.`,
    // Relatable analogy for a 15-year-old
    explainLike15: article.analogy || `Imagine your favorite game just got a massive update that everyone's talking about—that's basically what's happening here.`,
    publishedDate: article.publishedDate
  };
};

module.exports = {
  summarizeArticle
};
