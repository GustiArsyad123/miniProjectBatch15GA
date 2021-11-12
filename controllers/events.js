// Import models
const { event, comment, user, category, rating } = require("../models");

// Import sequelize
const { Op } = require("sequelize");

// Import moment
const moment = require("moment");

// Make pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 8;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// make paging data
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: events } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, events, totalPages, currentPage };
};

/**
 * PR
 * - search by keyword nya belum dibuat
 * - filter by time (tomorow dan today)
 *
 */

class Events {
  // Make getStartaedEvent function >>>>>> masih harus diperbaiki
  static async getStartedEvent(req, res, next) {
    try {
      console.log(moment());
      // Tampilan menu di home
      // - Event yg segera mulai
      // const a = await event.findAll({});
      // const hampir = a.createdAt - new Date();
      // const a = new Date();
      const dataStarted = await event.findAll({
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 4,
        order: [["dateEvent", "DESC"]],
      });

      if (!dataStarted) {
        return res.status(404).json({ errors: ["Events not found"] });
      }
      // - Explore by category
      const dataCategory = await category.findAll({
        attributes: ["category"],
      });
      // - Design event
      const dataDesign = await event.findAll({
        where: { categoryId: 2 },
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 4,
        order: [["dateEvent", "DESC"]],
      });
      res.status(200).json({ dataStarted, dataCategory, dataDesign });
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEvent function
  static async getAllEvents(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      let data = await event.findAndCountAll({
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 8,
        offset: 0,
        // where: { categoryId: req.userId.categoryId },
        order: [["dateEvent", "DESC"]],
      });

      if (data.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getEventByCategory
  static async getEventByCategory(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      let data = await event.findAndCountAll({
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 8,
        offset: 0,
        // where: { categoryId: req.userId.categoryId },
        where: { categoryId: req.params.id },
      });

      if (data.rows.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEventByWeek filter by week
  static async getAllEventsByWeek(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      let data = await event.findAndCountAll({
        where: {
          dateEvent: {
            [Op.gte]: moment().subtract(7, "days").toDate(),
          },
        },
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 8,
        offset: 0,
        // where: { categoryId: req.userId.categoryId },
        order: [["dateEvent", "ASC"]],
      });
      console.log(data);
      if (data.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEventByMonth filter by month
  static async getAllEventsByMonth(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      // Month
      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");

      let data = await event.findAndCountAll({
        where: {
          dateEvent: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 8,
        offset: 0,
        // where: { categoryId: req.userId.categoryId },
        order: [["dateEvent", "ASC"]],
      });

      if (data.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEventByYear filter by year
  static async getAllEventsByYear(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      // Year
      const startOfYear = moment().startOf("year").format("YYYY-MM-DD hh:mm");
      const endOfYear = moment().endOf("year").format("YYYY-MM-DD hh:mm");

      let data = await event.findAndCountAll({
        where: {
          dateEvent: {
            [Op.between]: [startOfYear, endOfYear],
          },
        },
        attributes: ["photoEvent", "dateEvent", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 8,
        offset: 0,
        // where: { categoryId: req.userId.categoryId },
        order: [["dateEvent", "ASC"]],
      });

      if (data.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getDetailEvent function
  static async getDetailEvent(req, res, next) {
    try {
      const data = await event.findOne({
        //  ganti nanti
        where: { id: req.params.id },
      });

      if (!data) {
        res.status(401).json({ message: ["Id not found"] });
      }

      const komen = await comment.findAll({
        attributes: ["comment"],
        include: [{ model: user, attributes: ["firstName", "image"] }],
        where: { eventId: data.id },
      });

      const rate = await rating.findAll({
        where: { eventId: data.id },
      });

      res.status(201).json({ data, komen, rate });
    } catch (error) {
      next(error);
    }
  }

  // Make create event function
  static async createEvent(req, res, next) {
    console.log("masuk sisni====================");
    try {
      const insertEvent = await event.create({
        title: req.body.title,
        photoEvent: req.body.photoEvent,
        dateEvent: req.body.dateEvent,
        detail: req.body.detail,
        linkMeet: req.body.linkMeet,
        speakerPhoto: req.body.speakerPhoto,
        speakerName: req.body.speakerName,
        speakerJobTitle: req.body.speakerJobTitle,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
      });

      // Get inserted event
      console.log(insertEvent);
      const data = await event.findOne({
        where: { id: insertEvent.id },
      });

      // send response with inserted event
      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Make update event function
  static async updateEvent(req, res, next) {
    try {
      console.log("masuk sini==================");
      const updateEvent = await event.update(
        {
          title: req.body.title,
          photoEvent: req.body.photoEvent,
          dateEvent: req.body.dateEvent,
          detail: req.body.detail,
          linkMeet: req.body.linkMeet,
          speakerPhoto: req.body.speakerPhoto,
          speakerName: req.body.speakerName,
          speakerJobTitle: req.body.speakerJobTitle,
          userId: req.body.id,
          categoryId: req.body.categoryId,
        },
        { where: { id: req.params.id } }
      );

      // Get updated event
      const data = await event.findOne({
        where: { id: req.params.id },
      });

      // send response with inserted event
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Make delete event function
  static async deleteEvent(req, res, next) {
    try {
      let data = await event.destroy({
        where: { id: req.params.id },
      });

      // If success
      res.status(200).json({ message: "Success delete event" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Events;
