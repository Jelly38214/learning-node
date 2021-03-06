const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env !== "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "c11090201",
    port: "3306",
    database: "myblog",
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "c11090201",
    port: "3306",
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONF,
};
