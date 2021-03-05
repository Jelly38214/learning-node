const getList = (author = "", keyword = "") => {
  return [
    {
      id: 1,
      title: "Title A",
      content: "Content A",
      createTime: 1,
      author: "Orange",
    },
    {
      id: 2,
      title: "Title B",
      content: "Content B",
      createTime: 2,
      author: "Cat",
    },
  ];
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
  return true
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
