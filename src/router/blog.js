const {
  delBlog,
  getList,
  getDetail,
  newBlog,
  updateBlog,
} = require("../controller/blog");
const { ErrorModel, SuccessModel } = require("../model/resModel");
const { loginCheck } = require("../utils");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    return getList(req.query.author, req.query.keyword).then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return getDetail(req.query.id).then((blogData) => {
      return new SuccessModel(blogData);
    });
  }

  // 新增博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const blogData = req.body;

    blogData["author"] = req.session.username;
    return newBlog(blogData).then((data) => {
      return new SuccessModel(data);
    });
  }

  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return updateBlog(req.query.id, req.body).then((isUpdate) => {
      return isUpdate
        ? new SuccessModel()
        : new ErrorModel("Update Blog unsuccessfully.");
    });
  }

  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    delBlog(req.query.id, req.session.username).then((isDel) => {
      return isDel
        ? new SuccessModel()
        : new ErrorModel("Update Blog unsuccessfully.");
    });
  }
};

module.exports = handleBlogRouter;
