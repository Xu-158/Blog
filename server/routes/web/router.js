const express = require('express');
const router = express.Router();
const handle = require('./handle')

router.get('/getArticle', handle.getArticle);
router.get('/getTag', handle.getTag);
router.get('/getFriendshipLinks', handle.getFriendshipLinks);
router.get('/getAbout', handle.getAbout);
router.get('/getTimeLine', handle.getTimeLine);

module.exports = router;