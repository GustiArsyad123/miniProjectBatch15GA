const express = require('express');

// const {
//   createOrUpdateCommentValidator,
// } = require("../middlewares/validators/comments");
const {
    createComment,
    updateComment,
    /*getAllComment,*/
    deleteComment} = require('../controllers/comments');

const router = express.Router();

// router.get("/", getAllComment);
router.post('/', /*createOrUpdateCommentValidator,*/createComment);
router.put('/:id', /*createOrUpdateCommentValidator,*/updateComment);
router.delete('/:id', deleteComment);

module.exports = router;