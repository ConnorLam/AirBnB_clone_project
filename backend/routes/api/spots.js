const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");

const router = express.Router();


router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [[sequelize.fn("AVG", sequelize.col('Reviews.stars')), 
            "avgRating"],
            [sequelize.literal('Images.url'), 'previewImage'],
        ],
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                where: {
                    previewImage: true
                },
                attributes: []
            }
    ]
    })
    res.json(spots)
})

module.exports = router