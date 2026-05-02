const express = require('express');
const router = express.Router();
const { 
  getNews, 
  getTrendingNews, 
  createNews, 
  updateNews, 
  deleteNews, 
  toggleLike, 
  getAnalytics 
} = require('../controllers/newsController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, getNews);
router.get('/trending', protect, getTrendingNews);
router.get('/analytics', protect, admin, getAnalytics);
router.post('/', protect, admin, createNews);
router.put('/:id', protect, admin, updateNews);
router.delete('/:id', protect, admin, deleteNews);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
