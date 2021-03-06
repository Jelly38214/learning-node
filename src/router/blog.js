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
    return new SuccessModel(getDetail(req.query.id));
  }

  // 新增博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const blogData = req.body;

    return new SuccessModel(newBlog(blogData));
  }

  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const isOk = updateBlog(req.query.id, req.body);
    if (!isOk) {
      return new ErrorModel("Update Blog faied.");
    }

    return new SuccessModel();
  }

  // 删除博客
  if (method === "POST" && req.path === "/api/blog/del") {
    const isOk = delBlog(req.query.id);

    if (!isOk) {
      return new ErrorModel("Update Blog faied.");
    }

    return new SuccessModel();
  }
};

module.exports = handleBlogRouter;
