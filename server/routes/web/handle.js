const response = require("../../utils/response");
const Article = require('../../models/Article')
const Tag = require("../../models/Tag");
const FriendshipLinks = require("../../models/FriendshipLinks");
const About = require("../../models/About");
const TimeLine = require("../../models/Timeline");

module.exports = {
  async getArticle(req,res){
    const data = await Article.find()
    response(res, 0, "获取文章列表成功",  data );
  },
  async getTag(req,res){
    const data = await Tag.find()
    response(res, 0, "获取标签列表成功",  data );
  },
  async getFriendshipLinks(req,res){
    const data = await FriendshipLinks.find()
    response(res, 0, "获取友链列表成功",  data );
  },
  async getAbout(req,res){
    const data = await About.find()
    response(res, 0, "获取关于我成功",  data );
  },
  async getTimeLine(req,res){
    const data = await TimeLine.find()
    response(res, 0, "获取时间线成功",  data );
  }
}