const express = require('express');
const router = express.Router();
const handle = require('./handle')

router.get('/getArticleList', handle.getArticleList);
router.get('/getArticleInfo', handle.getArticleInfo);
router.get('/getTag', handle.getTag);
router.get('/getFriendshipLinks', handle.getFriendshipLinks);
router.get('/getAbout', handle.getAbout);
router.get('/getTimeLine', handle.getTimeLine);

module.exports = router;