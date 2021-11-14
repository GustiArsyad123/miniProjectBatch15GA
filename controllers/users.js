// Import models
const { user, event, bookmark } = require("../models");

// Import encryption password
const { encryptPwd, isPwdValid } = require("../utils/encryption");

// Import jwt
const { generateToken } = require("../utils/jwt");

// Import faker
const faker = require("faker");

// Make class user
class UsersController {
  // Make signUp function
  static async signUp(req, res, next) {
    try {
      const { firstName, lastName, email } = req.body;
      const password = encryptPwd(req.body.password);
      console.log(password);
      console.log(req.body);
      const signup = await user.create({
        firstName,
        lastName,
        email,
        password,
        image: faker.image.avatar(),
      });

      console.log(signup);

      const data = await user.findOne({
        where: { id: signup.id },
        attributes: ["firstName", "lastName", "email", "image"],
      });

      return res.status(201).json({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Make save events functions
  static async saveEvents(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      let data = await bookmark.findAndCountAll({
        where: {
          userId: req.params.id,
        },
        include: [
          { model: event, attributes: ["photoEvent", "dateEvent", "title"] },
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit,
        offset,
        // where: { categoryId: req.userId.categoryId },
        order: [["createdAt", "DESC"]],
      });

      if (data.length === 0) {
        return res.status(404).json({ errors: ["Saved events not found"] });
      }

      return res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make My events functions
  static async myEvents(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      let data = await event.findAndCountAll({
        where: {
          userId: req.params.id,
        },
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit,
        offset,
        // where: { categoryId: req.userId.categoryId },
        order: [["dateEvent", "ASC"]],
      });

      if (data.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      return res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  //   Make function sign in
  static async signIn(req, res, next) {
    try {
      //   get the input
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
