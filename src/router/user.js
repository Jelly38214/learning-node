const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const method = req.method;

  // Login
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const isOk = login(username, password);

    if (!isOk) {
      return new ErrorModel("Login fail");
    }

    return new SuccessModel();
  }
};

module.exports = handleUserRouter;
