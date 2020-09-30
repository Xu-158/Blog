const express = require('express');
const router = express.Router();
const handle = require('./handle')

// Article
router.get('/getArticleList', handle.getArticleList);
router.get('/getArticleInfo', handle.getArticleInfo);
router.put('/likeCountAdd',handle.likeCountAdd)

// Tag
router.get('/getTagList', handle.getTagList);
router.get('/getTagArticle', handle.getTagArticle);

router.get('/getTimeLineList', handle.getTimeLineList);

router.get('/getFriendList', handle.getFriendshipLinks);

router.get('/getAboutMe', handle.getAboutMe);


module.exports = router;