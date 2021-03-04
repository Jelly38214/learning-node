const handleUserRouter = (req, res) => {
  const method = req.method;

  // Login
  if(method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'Login in'
    }
  }
};


module.exports = handleUserRouter