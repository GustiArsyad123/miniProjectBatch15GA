const { bookmark, user, category, event } = require("../models");
const { Op } = require("sequelize");

class Bookmark {
  static async getAllBookmarks(req, res, next) {
    try {
      const data = await bookmark.findAll({
        attributes: {
          exclude: ["eventId", "userId", "createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          { model: event, attributes: ["photoEvent", "dateEvent", "title"] },
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        where: {
          userId: req.loginUser.id,
        },
      });

      if (data.length === 0) {
        return res.status(400).json({ errors: ["Bookmark not found!"] });
      }
      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async createBookmark(req, res, next) {
    try {
      const eventId = req.params.id;
      const userId = req.loginUser.id;
      const categoryId = req.body.categoryId;

      const newData = await bookmark.create({
        eventId,
        userId,
        categoryId,
      });

      return res.status(201).json({ message: ["Event has been saved!"] });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const deletedData = await bookmark.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deletedData) {
        return res.status(400).json({ message: ["Bookmark not found!"] });
      }

      return res.status(200).json({ message: ["Success remove bookmark!"] });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Bookmark;
