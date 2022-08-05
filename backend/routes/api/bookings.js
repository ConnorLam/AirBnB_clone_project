const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize')

const router = express.Router();


router.get('/current', async (req, res) => {
    const {user} = req
    const bookings = await Booking.findAll({
        where: {userId: user.id},
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })
    // console.log(bookings)
    let bookingsArr = []

    for(let booking of bookings){
        const spot = await Spot.findByPk(booking.spotId, {
            attributes: {exclude: ['createdAt', 'updatedAt', 'description']},
            raw: true
        })
        console.log(spot)
        let image = await Image.findOne({
            where: {
                spotId: booking.spotId,
                previewImage: true
            },
        })
        // console.log(image)
        if(!image){
            spot.previewImage = null
        } else {
            spot.previewImage = image.url;
        }

        let bookingObj = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        bookingsArr.push(bookingObj)
    }

    console.log(bookingsArr)
    res.json({Bookings: bookingsArr})
})



















module.exports = router