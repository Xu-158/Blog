const response = require("../../utils/response");
const Article = require("../../models/Article");
const Tag = require("../../models/Tag");
const FriendshipLinks = require("../../models/FriendshipLinks");
const Admin = require("../../models/Admin");
const Role = require("../../models/Role");
const About = require("../../models/About");
const TimeLine = require("../../models/Timeline");
const jwt = require("jsonwebtoken");
const request = require("request");
const URole = require('../../utils/role')

module.exports = {
  // 验证token的中间件函数
  async auth(req, res, next) {
    const token = String(req.headers.authorization).split(" ").pop() || "";

    const { role } = await jwt.verify(token, req.app.get("secret"), async (err, token) => {
      if (err) {
        console.log('error' + err.message);
        return { role: null };
      }
      return token
    })

    if (role && role === URole.tourist && req.method !== "GET") {
      response(res, 1, "权限不足");
    } else if (role === URole.github || role === URole.admin || role === URole.tourist) {
      await next()
    } else {
      response(res, 1, "身份验证失败");
    }
  },

  async authHandle(req, res) {
    response(res, 0, "身份验证成功");
  },

  // 账号登陆
  async login(req, res) {
    let { account, password } = req.body;

    const isAdmin = await Admin.findOne({ account }).select("+password") || ""
    const user = require("bcryptjs").compareSync(password, isAdmin && isAdmin.password);
    if (!user) {
      response(res, 1, "账号或密码不正确！");
      return;
    }

    // 查询账号角色类型
    let role = await Role.findById(isAdmin.role)

    const token = jwt.sign({ role: `${role.type}`, id: String(isAdmin.id), }, req.app.get("secret"),
      { expiresIn: 60 * 60 * 24 });
    account += `(${role.type})`
    response(res, 0, "登陆成功", { account, role: URole.github }, token);
  },

  // 游客登陆
  async touristLogin(req, res) {
    const TouristId = await Role.findOne({ 'type': URole.tourist }) || '' //查找Role表 Tourist 类型
    const canLogin = await Admin.findOne({ role: `${TouristId._id}` })//检查Admin表 是否 有注册 Tourist 

    if (!canLogin) {
      response(res, 1, "登陆失败,暂未开启游客登录功能");
      return;
    }

    const tourist = {
      role: URole.tourist,
      account: `${canLogin.account}`,
    };

    const token = jwt.sign({ role: String(tourist.role), account: String(`${canLogin.account}`) }, req.app.get("secret"), {
      // 过期时间120秒自动失效
      expiresIn: 60 * 2
    });

    response(res, 0, "登陆成功", { account: `${canLogin.name}(${TouristId.type})`, role: URole.tourist }, token);
  },

  // GitHub登陆
  async githubLogin(req, res) {
    const { client_id, client_secret, url, headers, redirect_uri } = req.app.get("githubClient");
    console.log('client_id, client_secret, url, headers, redirect_uri: ', client_id, client_secret, url, headers, redirect_uri);

    const code = req.query.code;

    if (!code) {
      response(res, 1, "缺少必要参数'code'");
      return;
    }

    const body = {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      redirect_uri: redirect_uri
    };

    // 向github发送请求
    request({ url, method: "POST", json: true, headers, body, },
      function (error, resp, body) {
        console.log('error ', error);
        console.log(body.access_token);
        if (resp.statusCode === 200) {
          const { url, userAgent, loginAccount } = req.app.get("githubInfo");
          // 获取github用户信息
          request({
            url, method: "get", headers:
            {
              "User-Agent": userAgent,
              accept: "application/json",
              Authorization: `bearer ${body.access_token}`,
            },
          },
            function (error, resp, body) {
              console.log('resp.statusCode: ', resp.statusCode);
              let token, data, role;
              console.log('error: ', error);
              console.log('body: ', body);
              if (body) data = JSON.parse(body);
              if (!error && resp.statusCode == 200) {
                if (data.login === loginAccount) {
                  token = jwt.sign(
                    {
                      id: String(data),
                      role: URole.github,
                    },
                    req.app.get("secret"),
                    { expiresIn: 60 * 60 * 24 }
                  );
                  role = URole.github;
                } else {
                  token = jwt.sign(
                    {
                      id: String(data),
                      role: URole.tourist,
                    },
                    req.app.get("secret"),
                    { expiresIn: 60 * 2 }
                  );
                  role = URole.tourist;
                }
              }

              response(res, !error ? 0 : 1, !error ? "登陆成功" : "登录失败", { data, role, error }, token);
            }
          );
        }
      }
    );
  },

  /** 
   * 文章管理 Handle
   */
  // 编辑文章标签
  async tagEdit(req, res) {
    const { id, title } = req.body;
    let data, msg;
    let resCode = 0
    if (id) {
      data = await Tag.findByIdAndUpdate(id, { title });
      msg = "修改标签成功";
    } else {
      const isExist = await Tag.findOne({ title })
      if (!isExist) {
        data = await Tag.create({ title });
        msg = "创建标签成功";
      } else {
        msg = "不能创建同名标签";
        resCode = 1
      }
    }
    response(res, resCode, msg, data);
  },

  // 删除文章标签
  async tagDelete(req, res) {
    // 当删除标签时 应该解除关联该标签的文章
    const id = await req.query.id;
    const data = await Tag.findById(id);
    data.selectArticles && data.selectArticles.map(async (articleId) => {
      const article = await Article.findById(articleId)
      article.tags && (article.tags = article.tags.filter((curr) => curr != id))
      await article.save()
    })
    const tag = await Tag.findByIdAndDelete(id);
    response(res, 0, "删除文章标签", tag);
  },

  // 查询文章标签列表
  async tagList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1;
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
    // 跳过的条数
    const skip = (page - 1) * pageSize;
    const tagList = await Tag.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ _id: -1 });
    const totalSize = await Tag.find().countDocuments();
    response(res, 0, "查找标签列表", { tagList, totalSize });
  },

  // 编辑文章
  async articleEdit(req, res) {
    const { id, article } = req.body;
    let data, msg;
    let newTagsList = article.tags; //新文章 tags[](_id)
    if (id) {
      let tag, oldTagsList;
      oldTagsList = await Article.findById(id); //旧文章
      // 删除旧Tag 的 selectArticles 中文章id
      if (oldTagsList.tags) {
        oldTagsList.tags.map(async (old) => {
          tag = await Tag.findById(old);
          if ((tag.selectArticles).includes(id)) {
            // 把文章关联的标签的 selectArticles 数组中删除 文章的id
            tag.selectArticles = tag.selectArticles.filter((curr) => curr != id)
          }
          await tag.save();
        });
      }
      data = await Article.findByIdAndUpdate(id, article);
      msg = "修改文章成功";
    } else {
      data = await Article.create(article);
      msg = "创建文章成功";
    }
    let tag, newSelectArticles;
    if (newTagsList && article.isShow) {
      newTagsList.map(async (tagId) => {
        tag = await Tag.findById(tagId);
        // 往选中的标签的 selectArticles 数组 添加文章的id
        if (tag && tag.selectArticles) newSelectArticles = tag.selectArticles.push(data._id);
        await tag.save();
      });
    }
    response(res, 0, msg, data);
  },

  // 删除文章
  async articleDelete(req, res) {
    const id = req.query.id;
    const data = await Article.findByIdAndDelete(id);
    let tag;
    data.tags.map(async (tagId) => {
      tag = await Tag.findById(tagId);
      let targetIndex = tag.selectArticles.indexOf(id)
      if (targetIndex != -1) tag.selectArticles.splice(targetIndex, 1);
      await tag.save();
    });
    response(res, 0, "删除文章成功", data);
  },

  // 获取文章详细
  async articleInfo(req, res) {
    const { id, role } = req.query;
    const data = await Article.findById(id) || '';
    if (data.isShow) {
      response(res, 0, "获取文章成功", data);
    } else {
      if (role === URole.admin || role === URole.github) {
        response(res, 0, "获取文章成功", data);
      } else {
        response(res, 1, "该文章不可见状态！权限不足！");
      }
    }
  },

  // 查询文章列表
  async articleList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1;
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
    // 跳过的条数
    const skip = (page - 1) * pageSize;
    const data = await Article.find()
      .skip(skip)
      .limit(pageSize)
      .populate("tags")
      .sort({ _id: -1 });
    const totalSize = await Article.find().countDocuments();
    response(res, 0, "获取文章列表成功", { totalSize, data });
  },

  /**
   * 友情链接管理 handle
   */
  // 添加友情链接
  async linkEdit(req, res) {
    const { id, name, url, description } = req.body;
    let data, msg;
    if (id) {
      data = await FriendshipLinks.findByIdAndUpdate(id, {
        name,
        url,
        description,
      });
      msg = "修改链接成功";
    } else {
      data = await FriendshipLinks.create({ name, url, description });
      msg = "创建链接成功";
    }
    response(res, 0, msg, data);
  },

  async linkDelete(req, res) {
    const id = await req.query.id;
    const data = await FriendshipLinks.findByIdAndDelete(id);
    response(res, 0, "删除链接标签", data);
  },

  async linkList(req, res) {
    // 查询的页数
    const page = req.query.page ? Number(req.query.page) : 1;
    // 每页的条数
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
    // 跳过的条数
    const skip = (page - 1) * pageSize;
    const linkList = await FriendshipLinks.find()
      .skip(skip)
      .limit(pageSize)
      .populate("tags");
    const totalSize = await FriendshipLinks.find().countDocuments();
    response(res, 0, "获取链接列表成功", { totalSize, linkList });
  },

  /**
   * 管理员管理 handle
   */
  // 编辑管理员
  async adminEdit(req, res) {
    const { id, role, name, account, password } = req.body;
    const isExist = await Admin.findOne({ name });
    if (isExist && !id) {
      response(res, 1, "管理员已存在");
      return;
    }
    const adminSize = await Admin.find().countDocuments();
    if (adminSize >= 2) {
      response(res, 1, "管理员已达到上限");
      return;
    }
    let userNew, msg;
    if (id) {
      const user = await Admin.findById(id).select("+password");
      const isPassword = require("bcryptjs").compareSync(
        password,
        user.password
      );
      if (!isPassword) {
        response(res, 1, "密码错误");
        return;
      }
      userNew = await Admin.findByIdAndUpdate(id, {
        role,
        name,
        account,
        password,
      });
      msg = "更新管理员成功";
    } else {
      userNew = await Admin.create({ role, name, account, password });
      msg = "新建管理员成功";
    }
    response(res, 0, msg);
  },

  // 删除管理员
  async adminDelete(req, res) {
    const id = req.query.id;
    await Admin.findByIdAndDelete(id);
    response(res, 0, "删除管理员成功");
  },

  // 获取管理员列表
  async adminList(req, res) {
    const totalUser = await Admin.find().populate("role");
    const roleCount = await Role.find().countDocuments();
    if (roleCount < 1) {
      const roles = [{ type: URole.tourist }, { type: URole.admin }];
      await Role.create(roles);
    }
    response(res, 0, "获取管理员列表成功", totalUser);
  },

  // 角色列表
  async roleList(req, res) {
    const totalList = await Role.find();
    response(res, 0, "获取角色列表成功!", totalList);
  },

  /**
   * 时间线
   */
  // 编辑时间线
  async timeLineEdit(req, res) {
    const { id, timeLine } = req.body;
    let msg, data;
    if (id) {
      data = await TimeLine.findByIdAndUpdate(id, timeLine);
      msg = "修改时间线成功";
    } else {
      data = await TimeLine.create(timeLine);
      msg = "添加时间线成功";
    }
    response(res, 0, msg, data);
  },

  async timeLineDelete(req, res) {
    const id = req.query.id;
    const data = await TimeLine.findByIdAndDelete(id);
    response(res, 0, "删除时间线", data);
  },

  async timeLineList(req, res) {
    const timeLineList = await TimeLine.find();
    response(res, 0, "获取时间线列表成功", timeLineList);
  },

  /**
   * 关于我
   */
  async aboutEdit(req, res) {
    const { id, about } = req.body;
    let data, msg;
    if (id) {
      data = await About.findByIdAndUpdate(id, about);
      msg = "修改关于我成功！";
    } else {
      data = await About.create(about);
      msg = "创建关于我成功！";
    }
    response(res, 0, msg, data);
  },

  async aboutInfo(req, res) {
    const data = await About.findOne()
    response(res, 0, "获取关于我成功", data);
  },
};
