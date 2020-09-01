const response = require('../../utils/response')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')


module.exports = {
  /**
   * ::::文章管理handle
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
    if (id) {
      data = await Article.findByIdAndUpdate(id, article)
      msg = '修改文章成功'
    } else {
      data = await Article.create(article)
      msg = '创建文章成功'
    }
    response(res, 0, msg, data)
  },

  // 删除文章
  async ArticleDelete(req, res) {
    const id = req.query.id
    const data = await Article.findByIdAndDelete(id)
    response(res, 0, msg, data)
  },

  // 查询文章列表
  async ArticleList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    const skip = (page - 1) * pageSize
    const data = await Article.find().skip(skip).limit(pageSize)
    const totalSize = await Article.find().countDocuments()
    response(res, 0, '获取文章列表成功', { totalSize, data })
  },
}