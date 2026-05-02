const express = require('express');
const router = express.Router();
const { toggleBookmark, getBookmarks } = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

router.post('/:newsId', protect, toggleBookmark);
router.get('/', protect, getBookmarks);

module.exports = router;
