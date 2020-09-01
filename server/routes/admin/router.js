const express = require('express');
const router = express.Router();
const handle = require('./handle')

// 文章管理
router.post('/tag/edit', handle.TagEdit)
router.delete('/tag/delete', handle.TagDelete)
router.put('/tag/update', handle.TagEdit)
router.get('/tag/list', handle.TagList)
router.post('/article/edit', handle.ArticleList);
router.delete('/article/delete', handle.ArticleDelete)
router.put('/article/update', handle.ArticleEdit)
router.get('/article/list', handle.ArticleEdit);


module.exports = router;
