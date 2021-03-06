const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");


const handleUserRouter = (req, res) => {
  const method = req.method;

  // Login
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then((data) => {
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;
        return SuccessModel();
      }

      return new ErrorModel("Login in unsuccessfully.");
    });
  }
};

module.exports = handleUserRouter;
