const { comment, user } = require("../models");

class Comment {
  // Create Get All Comment
  static async getAllComments(req, res, next) {
    try {
      // Create Data Comment
      const allComments = await comment.findAll({
        attributes: ["id", "comment", "createdAt", "updatedAt"],
        include: [{ model: user, attributes: ["firstName", "image"] }],
        where: { eventId: req.params.id },
      });

      // If no comments
      if (allComments.length === 0) {
        return res.status(404).json({ message: ["There is no comments"] });
      }

      return res.status(201).json({ allComments });
    } catch (error) {
      next(error);
    }
  }

  // Create Comment
  static async createComment(req, res, next) {
    try {
      // Create Data Comment
      const newData = await comment.create({
        comment: req.body.comment,
        eventId: req.params.id,
        userId: req.loginUser.id,
      });

      // Find Data Comment
      const data = await comment.findOne({
        where: {
          id: newData.id,
        },
        attributes: ["id", "comment", "createdAt"],
        include: [
          {
            model: user,
            attributes: ["firstName", "lastName", "image"],
          },
        ],
      });

      return res
        .status(201)
        .json({ data, message: ["Success add your comment"] });
    } catch (error) {
      next(error);
    }
  }

  // Update Comment
  static async updateComment(req, res, next) {
    try {
      // Comment Table Update Data

      const commentId = await comment.findOne({
        where: { id: req.params.id },
      });

      if (commentId.userId !== req.loginUser.id) {
        return res
          .status(401)
          .json({ errors: ["You do not have permission to access this!"] });
      }

      const updatedData = await comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // If no data updated
      if (updatedData[0] === 0) {
        return res.status(404).json({ errors: ["Comment not found"] });
      }

      const data = await comment.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["comment", "createdAt"],
        include: [
          {
            model: user,
            attributes: ["firstName", "lastName", "image"],
          },
        ],
      });

      res.status(201).json({ data, message: ["Succes Update Your Comment"] });
    } catch (error) {
      next(error);
    }
  }

  // Delete Comment
  static async deleteComment(req, res, next) {
    try {
      // If id loginUser didn't match with comment userId
      const commentId = await comment.findOne({
        where: { id: req.params.id },
      });

      if (commentId.userId !== req.loginUser.id) {
        return res
          .status(401)
          .json({ errors: ["You do not have permission to access this!"] });
      }

      let data = await comment.destroy({ where: { id: req.params.id } });

      if (!data) {
        return res.status(404).json({ errors: ["Comment Not Found"] });
      }

      res.status(200).json({ message: "Success Delete Your Comment" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Comment;
