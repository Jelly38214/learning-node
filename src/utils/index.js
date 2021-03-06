const { ErrorModel, SuccessModel } = require("../model/resModel");

function getCookieExpires() {
  let current = new Date();
  current.setTime(current.getTime() + 10 * 60 * 1000);

  return current.toUTCString();
}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
      } else {
        resolve(JSON.parse(postData));
      }
    });
  });
};

function loginCheck(req) {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('Pls sign up.'));
  }
}

module.exports = {
  getCookieExpires,
  getPostData,
  loginCheck
};
