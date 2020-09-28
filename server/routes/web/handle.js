const response = require("../../utils/response");
const Article = require('../../models/Article')
const Tag = require("../../models/Tag");
const FriendshipLinks = require("../../models/FriendshipLinks");
const About = require("../../models/About");
const TimeLine = require("../../models/Timeline");

module.exports = {
  async getArticleList(req,res){
    const data = await Article.find({"isShow":true}).sort({ _id: -1 });
    response(res, 0, "获取文章列表成功",  data );
  },

  async getArticleInfo(req,res){
    const id = req.query.id
    const data = await Article.findById(id)
    response(res, 0, "获取文章详细成功",  data );
  },

  async getTagList(req,res){
    const data = await Tag.find().sort({ _id: -1 });
    response(res, 0, "获取标签列表成功",  data );
  },

  // 通过 Tag_id 查找文章
  async getTagArticle(req,res){
    const id = req.query.id
    const data = await Article.find({'tags':{$in:[id]},"isShow":true})
    response(res, 0, "获取标签列表成功",  data );
  },

  async getTimeLineList(req,res){
    const data = await TimeLine.find().sort({_id:-1})
    response(res, 0, "获取时间线成功",  data );
  },

  async getFriendshipLinks(req,res){
    const data = await FriendshipLinks.find()
    response(res, 0, "获取友链列表成功",  data );
  },

  async getAboutMe(req,res){
    const data = await About.findOne()
    response(res, 0, "获取关于我成功",  data );
  },

}