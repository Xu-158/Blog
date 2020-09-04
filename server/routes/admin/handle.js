const response = require('../../utils/response')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')



module.exports = {
  /**
   * 系统管理 Handle
   */
  // 上传文件
  async UploadFile(req, res) {
    let file = req.file
    const uploadConfig = req.app.get('uploadConfig')
    file.url = `${uploadConfig.filePath}/images/${file.filename}`
    response(res, 0, '上传成功', file)
  },


  /**
   * 文章管理 Handle
   */
  // 编辑文章标签
  async TagEdit(req, res) {
    const { id, title, count } = req.body
    let data, msg;
    if (id) {
      data = await Tag.findByIdAndUpdate(id, { title, count })
      msg = '修改标签成功'
    } else {
      data = await Tag.create({ title, count })
      msg = '创建标签成功'
    }
    response(res, 0, msg, data)
  },

  // 删除文章标签
  async TagDelete(req, res) {
    const id = await req.query.id
    const data = await Tag.findByIdAndDelete(id)
    response(res, 0, '删除文章标签', data)
  },

  // 查询文章标签列表
  async TagList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    const skip = (page - 1) * pageSize
    const tagList = await Tag.find().skip(skip).limit(pageSize)
    const totalSize = await Tag.find().countDocuments()
    response(res, 0, '查找标签列表', { tagList, totalSize })
  },

  // 编辑文章
  async ArticleEdit(req, res) {
    const { id, article } = req.body
    let data, msg;
    let newArticleTags = article.tags; //新文章 tags[](_id)
    if (id) {
      let tag, oldArticleTag
      oldArticleTag = await Article.findById(id) //旧文章 tags[](_id)
      // 删除旧Tag 的 selectArticles 中文章id
      oldArticleTag.tags.map(async old => {
        tag = await Tag.findById(old)
        tag.selectArticles.splice(tag.selectArticles.indexOf(id), 1)
        await tag.save()
      })
      data = await Article.findByIdAndUpdate(id, article)
      msg = '修改文章成功'
    } else {
      data = await Article.create(article)
      msg = '创建文章成功'
    }
    let tag, newSelectArticles
    newArticleTags.map(async tagId => {
      tag = await Tag.findById(tagId)
      newSelectArticles = tag.selectArticles.push(data._id)
      await tag.save()
    })
    response(res, 0, msg, data)
  },

  // 删除文章
  async ArticleDelete(req, res) {
    const id = req.query.id
    const data = await Article.findByIdAndDelete(id)
    let tag;
    data.tags.map(async tagId => {
      tag = await Tag.findById(tagId)
      tag.selectArticles.splice(tag.selectArticles.indexOf(tagId), 1)
      await tag.save()
    })
    response(res, 0, '删除文章成功', data)
  },

  // 获取文章详细
  async ArticleInfo(req, res) {
    const id = req.query.id
    const data = await Article.findById(id)
    response(res, 0, '获取文章成功', data)
  },

  // 查询文章列表
  async ArticleList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    const skip = (page - 1) * pageSize
    const data = (await (Article.find().skip(skip).limit(pageSize).populate('tags'))).reverse()
    const totalSize = await Article.find().countDocuments()
    response(res, 0, '获取文章列表成功', { totalSize, data })
  },
}