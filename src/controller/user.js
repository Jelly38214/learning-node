const { execSQL } = require("../db/mysql");
const login = (username, password) => {
  let sql = `
     select * from users 
     where username='${username}' and password='${password}'
  `;

  return execSQL(sql).then((rows) => {
    return rows[0] || {}
  });
};

module.exports = {
  login,
};
