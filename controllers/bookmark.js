const { bookmark, user, category, event } = require("../models");

// Make pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 8;
  const offset = (page - 1) * limit || 0;

  return { limit, offset };
};

// make paging data
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: events } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, events, totalPages, currentPage };
};

class Bookmark {
  static async getAllBookmarks(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      const data = await bookmark.findAll({
        attributes: {
          exclude: ["eventId", "userId", "createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          { model: event, attributes: ["photoEvent", "dateEvent", "title"] },
          { model: user, attributes: ["firstName"] },
          // ---------- PR => category belum ada relasi dengan tabel bookmark
          // { model: category, attributes: ["category"] },
        ],
        where: {
          userId: req.loginUser.id,
        },
        limit,
        offset,
      });

      if (data.length === 0) {
        return res.status(400).json({ errors: ["Bookmark not found!"] });
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async createBookmark(req, res, next) {
    try {
      const eventId = req.params.id;
      const userId = req.loginUser.id;

      const newData = await bookmark.create({
        eventId,
        userId,
      });

      res.status(201).json({ message: ["Event has been saved!"] });
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

      res.status(200).json({ message: ["Success remove bookmark!"] });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Bookmark;
