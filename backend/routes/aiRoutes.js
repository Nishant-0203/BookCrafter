const express =require('express');
const router = express.Router();
const { generateChapterContent, generateBookOutline } = require('../controller/aiController');
const { protect } = require('../middleware/authMiddleware');

//apply protect middleware to all routes
router.use(protect);
router.post('/generate-outline', generateBookOutline);
router.post('/generate-chapter-content', generateChapterContent);
module.exports = router;