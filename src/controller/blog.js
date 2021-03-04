const getList = (author = '', keyword = '') => {
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

module.exports = {
  getList
}