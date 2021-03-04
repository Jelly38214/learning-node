const { getList } = require("../controller/blog");
const { ErrorModel, SuccessModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const blogdata = getList(req.query.author, req.query.keyword);
    return new SuccessModel(blogdata);
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return {
      msg: "Get Blog Details",
    };
  }

  // 新增博客
  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "New A Blog",
    };
  }

  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "Update A Blog",
    };
  }

  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "Delete A Blog",
    };
  }
};

module.exports = handleBlogRouter;
