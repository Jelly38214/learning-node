const { execSQL } = require("../db/mysql");

const getList = (author = "", keyword = "") => {
  let sql = `select * from blogs where 1=1 `; // 1=1永远为true，避免报错
  if (author) {
    sql += `and author='${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }

  sql += "order by createtime desc;";

  return execSQL(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return execSQL(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData is a object including title, content, author.
  const { author, content, title } = blogData;
  let sql = `
    insert into blogs (title, content, author, createtime) 
    values('${title}', '${content}', '${author}', ${Date.now()})
  `;
  return execSQL(sql).then((insertData) => {
    console.log("insertData is: ", insertData);
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const { content, title } = blogData;
  const sql = `
    update blogs set content='${content}', title='${title}' 
    where id=${id}
  `;

  return execSQL(sql).then((updateData) => {
    console.log("updateData is: ", updateData);
    return updateData.affectedRows > 0;
  });
};

const delBlog = (id, author) => {
  // const sql = `update blogs set state='0' where id='${id}'`;
  const sql = `delete from blogs where id=${id} and author='${author}'`; // Avoid delete by others, so add author for guarantee.
  return execSQL(sql).then((delData) => {
    return delData.affectedRows > 0;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
