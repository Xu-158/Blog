const response = require("../../utils/response");
const Article = require('../../models/Article')
const Tag = require("../../models/Tag");
const FriendshipLinks = require("../../models/FriendshipLinks");
const About = require("../../models/About");
const TimeLine = require("../../models/Timeline");

module.exports = {
  async getArticleList(req, res) {
    // 查询的页数
    const page = req.query.page == 0 ? 0 : Number(req.query.page);
    // 每页的数量
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 4;
    // 跳过的条数
    const skip = page * pageSize;
    const articleList = await Article.find({ "isShow": true }).sort({ isTop: -1, _id: -1 }).skip(skip).limit(pageSize);
    const totlaSize = await Article.find({ "isShow": true }).countDocuments()
    response(res, 0, "获取文章列表成功", { articleList, totlaSize });
  },

  async getArticleInfo(req, res) {
    const id = req.query.id
    Article.findById(id, async (err, result) => {
      if (result) {
        result.hitCount++
        await result.save()
        response(res, 0, "获取文章详细成功", result);
      } else {
        response(res, 1, "获取文章详细失败", err);
      }
      console.log(err);
    })
  },

  async likeCountAdd(req, res) {
    const id = req.query.id
    let likeCount = req.query.likeCount
    if (likeCount) ++likeCount
    const data = await Article.findByIdAndUpdate(id, { likeCount }, { new: true }) //new  默认为false  返回修改后的数据。
    response(res, 0, "like++", data);
  },

  async getTagList(req, res) {
    const data = await Tag.find().sort({ _id: -1 });
    response(res, 0, "获取标签列表成功", data);
  },

  // 通过 Tag_id 查找文章
  async getTagArticle(req, res) {
    const id = req.query.id
    // 查询的页数
    const page = req.query.page == 0 ? 0 : Number(req.query.page);
    // 每页的数量
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 4;
    // 跳过的条数
    const skip = page * pageSize;
    const articleList = await Article.find({ "isShow": true, 'tags': { $in: [id] } }).sort({ isTop: -1, _id: -1 }).skip(skip).limit(pageSize);
    const totlaSize = await Article.find({ "isShow": true, 'tags': { $in: [id] }, }).countDocuments()
    response(res, 0, "获取标签列表成功", { articleList, totlaSize });
  },

  async getTimeLineList(req, res) {
    const data = await TimeLine.find().sort({ _id: -1 })
    response(res, 0, "获取时间线成功", data);
  },

  async getFriendshipLinks(req, res) {
    const data = await FriendshipLinks.find()
    response(res, 0, "获取友链列表成功", data);
  },

  async getAboutMe(req, res) {
    const data = await About.findOne()
    response(res, 0, "获取关于我成功", data);
  },

}