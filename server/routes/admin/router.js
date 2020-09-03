const express = require('express');
const router = express.Router();
const path = require('path')

const handle = require('./handle')
const handleMulter = require('../../utils/multer')()

// 托管静态文件
router.use('/uploads/images', express.static(path.join(__dirname, '../../uploads/images')))

// 上传文件
router.post('/uploads/images', handleMulter.single('file'), handle.UploadFile)

// 文章管理
router.post('/tag/edit', handle.TagEdit)
router.delete('/tag/delete', handle.TagDelete)
router.put('/tag/update', handle.TagEdit)
router.get('/tag/list', handle.TagList)

router.post('/article/edit', handle.ArticleEdit);
router.delete('/article/delete', handle.ArticleDelete)
router.put('/article/update', handle.ArticleEdit)
router.get('/article/info',handle.ArticleInfo)
router.get('/article/list', handle.ArticleList);


module.exports = router;
