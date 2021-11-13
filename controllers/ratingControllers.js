const {rating} = require('../models');

class Rating {
    static async createRating (req,res,next) {
        try {
            const newData = await rating.create({
                rating: req.body.rating,
                eventId: req.body.eventId,
                userId: req.body.userId,
                categoryId: req.body.categoryId
            });

            const data = await rating.findOne({
                where: {
                    id: newData.id,
                },
            });

            res.status(201).json({ data, message: ['Success Add Rating']});
        } catch (error) {
            
        }
    }
};