const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  whyItMatters: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Tech', 'Business', 'Finance', 'World', 'Sports', 'Politics', 'Crypto', 'Startups'] 
  },
  likesCount: { type: Number, default: 0 },
  bookmarksCount: { type: Number, default: 0 },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
