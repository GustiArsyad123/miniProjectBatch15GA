const {rating} = require('../models');

class Rating {
    static async createRating (req,res,next) {
        try {
            // Create Rating
            const newData = await rating.create({
                rating: req.body.rating,
                eventId: req.body.eventId,
                userId: req.body.userId,
                categoryId: req.body.categoryId
            });
            // Find Data Rating
            const data = await rating.findOne({
                where: {
                    id: newData.id,
                },
                attributes:{
                    exclude: ['createdAt', 'updatedAt'],
                },
            });

            res.status(201).json({ data, message: ['Success Add Rating']});
        } catch (error) {
            res.status(500).json({ errors: ["Internal Server Error"] });
        }
    }
};

module.exports = Rating;