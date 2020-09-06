const response = require('../../utils/response')
const Article = require('../../models/Article')
const Tag = require('../../models/Tag')
const FriendshipLinks = require('../../models/FriendshipLinks')
const Admin = require('../../models/Admin')
const Role = require('../../models/Role')
const jwt = require('jsonwebtoken')

module.exports = {
  // 验证token的中间件函数
  async auth(req, res, next) {
    const token = String(req.headers.authorization).split(' ').pop()
    const { role } = await jwt.verify(token, req.app.get('secret'), async (err, token) => {
      if (err) {
        response(res, 1, '未登录')
        return err
      }
      return token
    })

    if (role === 'Tourist' && req.method !== "GET") {
      response(res, 1, '权限不足')
      return
    }

    await next()
  },

  async authHandle(req, res) {
    response(res, 0, '身份验证成功')
  },

  // 登陆
  async login(req, res) {
    const { account, password } = req.body
    const isAdmin = await Admin.findOne({ account }).select('+password')
    if (!isAdmin) {
      response(res, 1, '用户不存在')
      return
    }
    const user = require('bcryptjs').compareSync(password, isAdmin.password)
    if (!user) {
      response(res, 1, '密码错误')
      return
    }

    const token = jwt.sign({
      id: String(isAdmin.id),
    }, req.app.get('secret'))
    response(res, 0, '登陆成功', { account }, token)
  },

  // 游客登陆
  async touristLogin(req, res) {
    const tourist = { role: 'Tourist', account: '123456', password: '123456' }
    const token = jwt.sign({
      role: String(tourist.role),
    }, req.app.get('secret'))
    response(res, 0, '登陆成功', { account: '游客' }, token)
  },

  /**
   * 系统管理 Handle
   */
  // 上传文件
  async uploadFile(req, res) {
    let file = req.file
    const uploadConfig = req.app.get('uploadConfig')
    file.url = `${uploadConfig.filePath}/images/${file.filename}`
    response(res, 0, '上传成功', file)
  },


  /**
   * 文章管理 Handle
   */
  // 编辑文章标签
  async tagEdit(req, res) {
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
  async tagDelete(req, res) {
    const id = await req.query.id
    const data = await Tag.findByIdAndDelete(id)
    response(res, 0, '删除文章标签', data)
  },

  // 查询文章标签列表
  async tagList(req, res) {
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
  async articleEdit(req, res) {
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
  async articleDelete(req, res) {
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
  async articleInfo(req, res) {
    const id = req.query.id
    const data = await Article.findById(id)
    response(res, 0, '获取文章成功', data)
  },

  // 查询文章列表
  async articleList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    const skip = (page - 1) * pageSize
    const data = await (Article.find().skip(skip).limit(pageSize).populate('tags')).sort({ _id: -1 })
    const totalSize = await Article.find().countDocuments()
    response(res, 0, '获取文章列表成功', { totalSize, data })
  },

  /**
   * 友情链接管理 handle
   */
  // 添加友情链接
  async linkEdit(req, res) {
    const { id, name, url } = req.body
    let data, msg;
    if (id) {
      data = await FriendshipLinks.findByIdAndUpdate(id, { name, url })
      msg = '修改链接成功'
    } else {
      data = await FriendshipLinks.create({ name, url })
      msg = '创建链接成功'
    }
    response(res, 0, msg, data)
  },

  async linkDelete(req, res) {
    const id = await req.query.id
    const data = await FriendshipLinks.findByIdAndDelete(id)
    response(res, 0, '删除链接标签', data)
  },

  async linkList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    const skip = (page - 1) * pageSize
    const linkList = await FriendshipLinks.find().skip(skip).limit(pageSize).populate('tags')
    const totalSize = await FriendshipLinks.find().countDocuments()
    response(res, 0, '获取链接列表成功', { totalSize, linkList })
  },

  /**
   * 管理员管理 handle
   */
  // 编辑管理员
  async adminEdit(req, res) {
    const { id, role, name, account, password } = req.body
    const isExist = await Admin.findOne({ name })
    if (isExist && !id) {
      response(res, 1, '管理员已存在')
      return
    }
    const adminSize = await Admin.find().countDocuments()
    if (adminSize > 1) {
      response(res, 1, '管理员已达到上限')
      return
    }
    let userNew, msg
    if (id) {
      const user = await Admin.findById(id).select('+password')
      const isPassword = require('bcryptjs').compareSync(password, user.password)
      if (!isPassword) {
        response(res, 1, '密码错误')
        return
      }
      userNew = await Admin.findByIdAndUpdate(id, { role, name, account, password })
      msg = '更新管理员成功'
    } else {
      userNew = await Admin.create({ role, name, account, password })
      msg = '新建管理员成功'
    }
    response(res, 0, msg)
  },

  // 删除管理员
  async adminDelete(req, res) {
    const id = req.query.id
    const user = await Admin.findByIdAndDelete(id)
    response(res, 0, '删除管理员成功')
  },

  // 获取管理员列表
  async adminList(req, res) {
    const totalUser = await Admin.find().populate('role')
    response(res, 0, '获取管理员列表成功', totalUser)
  },

  // 新建角色
  async addRole(req, res) {
    const role = req.body
    const totalRole = await Role.find().countDocuments()
    if (totalRole > 1) {
      response(res, 1, '角色已达到上限!')
      return
    }
    const data = await Role.create(role)
    response(res, 0, '创建角色成功!')
  },

  // 删除角色
  async deleteRole(req, res) {
    const id = req.query.id
    await findByIdAndDelete(id)
    response(res, 0, '删除角色成功!')
  },

  // 角色列表
  async roleList(req, res) {
    const totalList = await Role.find()
    response(res, 0, '获取角色列表成功!', totalList)
  },

}