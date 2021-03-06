const {
  delBlog,
  getList,
  getDetail,
  newBlog,
  updateBlog,
} = require("../controller/blog");
const { ErrorModel, SuccessModel } = require("../model/resModel");

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
    const blogData = req.body;

    blogData["author"] = "zhangsan"; // For non-login-in phase.
    return newBlog(blogData).then((data) => {
      return new SuccessModel(data);
    });
  }

  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(req.query.id, req.body).then((isUpdate) => {
      return isUpdate
        ? new SuccessModel()
        : new ErrorModel("Update Blog unsuccessfully.");
    });
  }

  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    delBlog(req.query.id, "zhangsan").then((isDel) => {
      return isDel
        ? new SuccessModel()
        : new ErrorModel("Update Blog unsuccessfully.");
    });
  }
};

module.exports = handleBlogRouter;
