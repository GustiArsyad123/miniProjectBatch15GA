const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");

// Make class of create or update users validator
exports.createOrUpadateUserValidator = async (req, res, next) => {
  try {
    const errors = [];

    //Check input of FirstName
    if (validator.isEmpty(req.body.firstName, { ignore_whitespace: false })) {
      errors.push("Please input the FirstName!");
    }

     //Check input of LastName
    if (validator.isEmpty(req.body.lastName, { ignore_whitespace: false })) {
      errors.push("Please input the LastName!");
    }

    // Check for the image of Users was upload or not
    if (!(req.files && req.files.photoUser)) {
      errors.push("Please upload the image");
    } else if (req.files.photoUser) {
      // If image was uploaded the photo user

      // req.files.photoUser is come from key (file) in postman
      const file = req.files.photoUser;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errors.push("File must be an image");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errors.push("Image must be less than 1MB");
      }

      // If error
      if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // Make file.mv to promise
      const move = promisify(file.mv);

      // Upload image to /public/images
      await move(`./public/images/users/${file.name}`);

      // assign req.body.image with file.name
      req.body.photoUser = file.name;
    }

    // Check input of detail and min character 100
    if (
      validator.contains(req.body.detail, {
        ignoreCase: false,
        minOccurrences: 100,
        maxOccurrences: 600,
      })
    ) {
      errors.push("Detail of event min 300 and max 600 characters!");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};
