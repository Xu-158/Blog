const express = require('express');
const router = express.Router();
const path = require('path')

const handle = require('./handle')
const handleMulter = require('../../utils/multer')()

// 托管静态文件
router.use('/uploads/images', express.static(path.join(__dirname, '../../uploads/images')))

// 登陆
router.get('/auth', handle.auth, handle.authHandle)
router.post('/login', handle.login)
router.post('/touris/login', handle.touristLogin)

// 上传文件
router.post('/uploads/images', handle.auth, handleMulter.single('file'), handle.uploadFile)

// 文章标签
router.post('/tag/edit', handle.auth, handle.tagEdit)
router.delete('/tag/delete', handle.auth, handle.tagDelete)
router.put('/tag/update', handle.auth, handle.tagEdit)
router.get('/tag/list', handle.auth, handle.tagList)

// 文章管理
router.post('/article/edit', handle.auth, handle.articleEdit);
router.delete('/article/delete', handle.auth, handle.articleDelete)
router.put('/article/update', handle.auth, handle.articleEdit)
router.get('/article/info', handle.auth, handle.articleInfo)
router.get('/article/list', handle.auth, handle.articleList);

// 友情链接管理
router.post('/link/edit', handle.auth, handle.linkEdit);
router.delete('/link/delete', handle.auth, handle.linkDelete)
router.put('/link/update', handle.auth, handle.linkEdit)
router.get('/link/list', handle.auth, handle.linkList);

// 管理员
router.post('/admin/edit', handle.auth, handle.adminEdit)
router.delete('/admin/delete', handle.auth, handle.adminDelete)
router.put('/admin/update', handle.auth, handle.adminEdit)
router.get('/admin/list', handle.auth, handle.adminList)

// 角色
router.get('/role/list', handle.auth, handle.roleList)

// 时间线
router.post('/timeLine/edit', handle.auth, handle.timeLineEdit)
router.delete('/timeLine/delete', handle.auth, handle.timeLineDelete)
router.put('/timeLine/update', handle.auth, handle.timeLineEdit)
router.get('/timeLine/list', handle.auth, handle.timeLineList)

// 关于我
// router.post('/about/edit', handle.auth, handle.aboutEdit)
router.put('/about/update', handle.auth, handle.aboutEdit)
router.get('/about/info', handle.auth, handle.aboutInfo)


module.exports = router;
