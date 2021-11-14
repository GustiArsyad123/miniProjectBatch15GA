const validator = require("validator");

exports.createRatingValidator = async (req, res, next) => {
  try {
    const errors = [];

    if (!validator.isInt(req.body.rating)) {
      errors.push("Please Input Number!");
    }

    if (req.body.rating > 5 || req.body.rating < 0) {
      errors.push("Rating must be in the range 0-5");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};
