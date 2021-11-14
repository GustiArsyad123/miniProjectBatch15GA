const { decodeToken } = require("../utils/jwt");
//const { user } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Please sign in first",
      });
    }
    //   Save token to userData
    let token = req.headers.access_token;
    let userData = decodeToken(token);
    req.loginUser = userData;
    next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = authentication;
