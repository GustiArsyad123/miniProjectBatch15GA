const { user } = require("../../models");

const authorization = async (req, res, next) => {
  try {
    const userId = req.loginUser.id;
    const UserId = req.params.id;

    const userData = await user.findOne({
      where: {
        id: UserId,
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
    next(error);
  }
};

module.exports = authorization;
