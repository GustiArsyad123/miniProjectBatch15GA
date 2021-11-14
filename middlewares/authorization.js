const { User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const userId = req.loginUser.id;
    const UserId = req.params.id;
    console.log("======== USER ======");
    console.log(UserId);

    const userData = await User.findOne({
      where: {
        UserId,
      },
    });

    if (userData.dataValues.userId != userId) {
      res.status(401).json({
        status: 401,
        msg: "Anda tidak berhak akan akses ini",
      });
      return;
    }

    next();
  } catch (error) {
    // next(error)
    console.log(error);
  }
};

module.exports = authorization;
