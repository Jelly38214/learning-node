const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db");

// Create connect instantiation.
const db = mysql.createConnection(MYSQL_CONF);

// Start connecting.
db.connect();

// Execute SQL.
function execSQL(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

module.exports = {
  execSQL,
};
