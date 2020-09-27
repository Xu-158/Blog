const express = require('express');
const router = express.Router();
const handle = require('./handle')

// Article
router.get('/getArticleList', handle.getArticleList);
router.get('/getArticleInfo', handle.getArticleInfo);

// Tag
router.get('/getTagList', handle.getTagList);
router.get('/getTagArticle', handle.getTagArticle);

router.get('/getFriendshipLinks', handle.getFriendshipLinks);

router.get('/getAbout', handle.getAbout);

router.get('/getTimeLine', handle.getTimeLine);

module.exports = router;