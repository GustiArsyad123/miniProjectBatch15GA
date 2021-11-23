// Import models
const { event, comment, user, category, rating } = require("../models");

// Import sequelize
const { Op } = require("sequelize");

// Import moment
const moment = require("moment");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "drta3xh4e",
  api_key: process.env.SECRET_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_API_CLOUDINARY,
});

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
  const nextPage = page ? +page + 1 : 2;
  const prevPage = page ? +page - 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, events, totalPages, currentPage, prevPage, nextPage };
};

class Events {
  static async getStartedEvent(req, res, next) {
    try {
      // Get started
      const dataStarted = await event.findAll({
        where: {
          dateEvent: {
            [Op.between]: [
              moment().startOf("day").format(),
              moment().add(7, "days").format(),
            ],
          },
        },
        attributes: ["photoEvent", "eventDate", "eventTime", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 4,
        order: [["dateEvent", "ASC"]],
      });

      if (!dataStarted) {
        return res.status(404).json({ errors: ["Events not found"] });
      }
      // - Explore by categories
      const dataCategory = await category.findAll({
        attributes: ["category"],
      });
      // - Design event
      const dataDesign = await event.findAll({
        where: { categoryId: 2 },
        attributes: ["photoEvent", "eventDate", "eventTime", "title"],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit: 4,
        order: [["dateEvent", "DESC"]],
      });
      return res.status(200).json({ dataStarted, dataCategory, dataDesign });
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEvent function
  static async getAllEvents(req, res, next) {
    try {
      const { page, size, kategori } = req.query;
      let { waktu, nata } = req.query;
      const { limit, offset } = getPagination(page, size);
      let data = "";
      let a = new Date();
      let b = a.setDate(a.getDate() + 1);
      let c = new Date(b).setHours(0, 0, 0, 0);
      let d = new Date(b).setHours(23, 59, 0, 0);

      let today1 = moment().startOf("day").format();
      let today2 = moment().endOf("day").format();
      let tomorrow1 = moment(c).format();
      let tomorrow2 = moment(d).format();
      let week1 = moment().startOf("day").format();
      let week2 = moment().add(7, "days").format();
      let bulan1 = moment().startOf("month").format();
      let bulan2 = moment().endOf("month").format();
      let year1 = moment().startOf("year").format();
      let year2 = moment().endOf("year").format();
      let waktu1 = "";
      let waktu2 = "";

      if (waktu == "today") {
        waktu1 = today1;
        waktu2 = today2;
      } else if (req.query.waktu == "tomorrow") {
        waktu1 = tomorrow1;
        waktu2 = tomorrow2;
      } else if (req.query.waktu == "week") {
        waktu1 = week1;
        waktu2 = week2;
      } else if (req.query.waktu == "month") {
        waktu1 = bulan1;
        waktu2 = bulan2;
      } else if (req.query.waktu == "year") {
        waktu1 = year1;
        waktu2 = year2;
      }

      if (nata == "date") {
        nata = "dateEvent";
      } else if (nata == "name") {
        nata = "title";
      }

      if (waktu && kategori && nata) {
        data = await event.findAndCountAll({
          where: {
            [Op.and]: [
              {
                categoryId: kategori,
                dateEvent: {
                  [Op.between]: [waktu1, waktu2],
                },
              },
            ],
          },
          attributes: ["photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          order: [[nata, "ASC"]],
        });
      } else if (waktu && kategori) {
        data = await event.findAndCountAll({
          where: {
            [Op.and]: [
              {
                categoryId: kategori,
                dateEvent: {
                  [Op.between]: [waktu1, waktu2],
                },
              },
            ],
          },
          attributes: ["photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          order: [["dateEvent", "ASC"]],
        });
      } else if (waktu && nata) {
        data = await event.findAndCountAll({
          where: {
            dateEvent: {
              [Op.between]: [waktu1, waktu2],
            },
          },
          attributes: ["photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          order: [[nata, "ASC"]],
        });
      } else if (kategori && nata) {
        data = await event.findAndCountAll({
          attributes: ["id", "photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          where: { categoryId: kategori },
          limit,
          offset,
          order: [[nata, "ASC"]],
        });
      } else if (waktu) {
        data = await event.findAndCountAll({
          where: {
            dateEvent: {
              [Op.between]: [waktu1, waktu2],
            },
          },
          attributes: ["photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
        });
      } else if (kategori) {
        data = await event.findAndCountAll({
          attributes: ["id", "photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          where: { categoryId: kategori },
        });
      } else if (nata) {
        data = await event.findAndCountAll({
          attributes: ["id", "photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          order: [[nata, "ASC"]],
        });
      } else {
        data = await event.findAndCountAll({
          attributes: ["id", "photoEvent", "eventDate", "eventTime", "title"],
          include: [
            { model: user, attributes: ["firstName"] },
            { model: category, attributes: ["category"] },
          ],
          limit,
          offset,
          order: [["dateEvent", "DESC"]],
        });
      }

      if (data.rows.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      return res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Search Event
  static async searchEvent(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      const cari = req.query.cari;

      let data = await event.findAndCountAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${cari}%`,
              },
            },
            {
              speakerName: {
                [Op.iLike]: `%${cari}%`,
              },
            },
          ],
        },
        attributes: [
          "photoEvent",
          "eventDate",
          "eventTime",
          "title",
          "speakerName",
        ],
        include: [
          { model: user, attributes: ["firstName"] },
          { model: category, attributes: ["category"] },
        ],
        limit,
        offset,
        order: [["dateEvent", "DESC"]],
      });

      if (data.rows.length === 0) {
        return res.status(404).json({ errors: ["Events not found"] });
      }

      return res.status(200).json(getPagingData(data, page, limit));
    } catch (error) {
      next(error);
    }
  }

  // Make getDetailEvent function
  static async getDetailEvent(req, res, next) {
    try {
      const data = await event.findOne({
        where: { id: req.params.id },
        include: [
          { model: user, attributes: ["firstName", "lastName", "image"] },
          { model: category, attributes: ["category"] },
        ],
      });

      if (!data) {
        res.status(401).json({ message: ["Event not found"] });
      }

      // To show all comments of this event
      const komen = await comment.findAll({
        attributes: ["id", "comment", "createdAt", "updatedAt"],
        include: [{ model: user, attributes: ["firstName", "image"] }],
        where: { eventId: data.id },
      });

      /** count rating */
      const sumRate = await rating.sum("rating", {
        where: { eventId: req.params.id },
      });

      const countRate = await rating.count({
        where: { eventId: req.params.id },
      });

      const avg = sumRate / countRate;

      // send response
      return res.status(201).json({ data, komen, avg });
    } catch (error) {
      next(error);
    }
  }

  // Make create event function
  static async createEvent(req, res, next) {
    try {
      const {
        title,
        photoEvent,
        dateEvent,
        eventTime,
        detail,
        linkMeet,
        speakerName,
        speakerJobTitle,
        categoryId,
      } = req.body;

      let date1 = moment(req.body.dateEvent).format("dddd");
      let date2 = moment(req.body.dateEvent).format("ll");
      let tanggal = `${date1}, ${date2}`;

      const insertEvent = await event.create({
        title,
        photoEvent,
        dateEvent,
        eventDate: tanggal,
        eventTime,
        detail,
        linkMeet,
        speakerName,
        speakerJobTitle,
        userId: req.loginUser.id,
        categoryId,
      });

      // Upload image to cloudinary and updated photo event value and send data
      cloudinary.uploader.upload(
        `./public/images/events/${req.body.photoEvent}`,
        async function (result, error) {
          let a = result.secure_url;

          let b = insertEvent.dataValues.id;

          // update photo event value with image url
          const updateEvent = await event.update(
            {
              title,
              photoEvent: a,
              dateEvent,
              eventDate: tanggal,
              eventTime,
              detail,
              linkMeet,
              speakerName,
              speakerJobTitle,
              userId: req.loginUser.id,
              categoryId,
            },
            { where: { id: b } }
          );

          // Get inserted event
          const data = await event.findOne({
            where: { id: b },
          });

          // send response with inserted event
          return res
            .status(201)
            .json({ data, message: ["Event has been created!"] });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  // Make update event function
  static async updateEvent(req, res, next) {
    try {
      const eventUser = await event.findOne({
        where: { id: req.params.id },
      });

      if (!eventUser) {
        return res.status(400).json({ message: ["Event not found!"] });
      }

      if (eventUser.userId !== req.loginUser.id) {
        return res.status(401).json({
          errors: ["You do not have permission to access this!"],
        });
      }

      const {
        title,
        photoEvent,
        dateEvent,
        eventTime,
        detail,
        linkMeet,
        speakerName,
        speakerJobTitle,
        categoryId,
      } = req.body;

      let date1 = moment(req.body.dateEvent).format("dddd");
      let date2 = moment(req.body.dateEvent).format("ll");
      let tanggal = `${date1}, ${date2}`;
      const updateEvent = await event.update(
        {
          title,
          photoEvent,
          dateEvent,
          eventDate: tanggal,
          eventTime,
          detail,
          linkMeet,
          speakerName,
          speakerJobTitle,
          userId: req.loginUser.id,
          categoryId,
        },
        { where: { id: req.params.id } }
      );

      // Upload image to cloudinary and updated photo event value and send data
      cloudinary.uploader.upload(
        `./public/images/events/${req.body.photoEvent}`,
        async function (result, error) {
          let a = result.secure_url;

          // update photo event value with image url
          const updateEvent2 = await event.update(
            {
              title,
              photoEvent: a,
              dateEvent,
              eventDate: tanggal,
              eventTime,
              detail,
              linkMeet,
              speakerName,
              speakerJobTitle,
              userId: req.loginUser.id,
              categoryId,
            },
            { where: { id: req.params.id } }
          );

          // Get inserted event
          const data = await event.findOne({
            where: { id: req.params.id },
          });

          // send response with inserted event
          return res
            .status(201)
            .json({ data, message: ["Event has been updated!"] });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  // Make delete event function
  static async deleteEvent(req, res, next) {
    try {
      const eventUser = await event.findOne({
        where: { id: req.params.id },
      });

      if (!eventUser) {
        return res.status(400).json({ message: ["Event not found!"] });
      }

      if (eventUser.userId !== req.loginUser.id) {
        return res.status(401).json({
          errors: ["You do not have permission to access this!"],
        });
      }

      let data = await event.destroy({
        where: { id: req.params.id },
      });

      // If success
      return res.status(200).json({ message: "Event has been deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Events;
