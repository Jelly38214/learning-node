const { execSQL } = require("../db/mysql");

const getList = (author = "", keyword = "") => {
  let sql = `select * from blogs where 1=1 `; // 1=1永远为true，避免报错
  if (author) {
    sql += `and author='${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }

  sql += 'order by createtime desc;'

  return execSQL(sql);
};

const getDetail = (id) => {
  return {
    id: 1,
    title: "Title A",
    content: "Content A",
    createTime: 1,
    author: "Orange",
  };
};

const newBlog = (blogData = {}) => {
  // blogData is a object including title, content properties
  return {
    id: 3,
  };
};

const updateBlog = (id, blogData = {}) => {
  return true;
};

const delBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
