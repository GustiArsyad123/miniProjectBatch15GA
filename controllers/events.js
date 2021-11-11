// Import models
const { event, comment, user } = require("../models");

class Events {
  // Make getStartaedEvent function
  static async getStartedEvent(req, res, next) {
    try {
      // Tampilan menu di home
      // - Event yg segera mulai
      // - Explore by category
      // - Design event
    } catch (error) {
      next(error);
    }
  }

  // Make getAllEvent function
  static async getAllEvents(req, res, next) {
    try {
      // - get all events
      // - filter by category
      // - filter by date
    } catch (error) {
      next(error);
    }
  }

  // Make create event function
  static async createEvent(req, res, next) {
    try {
      const insertEvent = await event.create({
        title: req.body.title,
        photoEvent: req.body.photoEvent,
        dateEvent: req.body.dateEvent,
        detail: req.body.detail,
        linkMeet: req.body.linkMeet,
        speakerPhoto: req.files.speakerPhoto,
        speakerName: req.body.speakerName,
        speakerJobTitle: req.body.speakerJobTitle,
        userId: req.userData.id,
        categoryId: req.body.categoryId,
      });

      // Get inserted event
      const data = await event.findOne({
        where: { id: insertEvent.id },
      });

      // send response with inserted event
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Make update event function
  static async updateEvent(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // Make delete event function
  static async deleteEvent(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Events;
