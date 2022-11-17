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
      where: { userId: user.id },
      attributes: [
        "id",
        "spotId",
        "userId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
      ],
      order: [["startDate", "ASC"]],
      raw: true
    });
    // console.log(bookings)
    let bookingsArr = []

    for(let booking of bookings){

      console.log('\n\n\n', booking, '\n\n\n')

        const spot = await Spot.findByPk(booking.spotId, {
            attributes: {exclude: ['createdAt', 'updatedAt', 'description']},
            raw: true
        })

        const spotBookings = await Booking.findAll({
          where: {
            spotId: booking.spotId
          },
          order: [['startDate', 'ASC']],
          raw: true
        })

        if(spot){
          spot['booking'] = spotBookings
        }
        // console.log(spot)
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

    // console.log(bookingsArr)
    res.json({Bookings: bookingsArr})
})


router.put('/:bookingId', requireAuth, async(req, res) => {
    const {user} = req
    const id = user.id
    const {startDate, endDate} = req.body
    const today = new Date().toISOString().slice(0, 10)

    const booking = await Booking.findByPk(req.params.bookingId, {
        where: {userId: id}
    })

    const spot = await Spot.findByPk(booking.spotId, {
      attributes: { exclude: ["createdAt", "updatedAt", "description"] },
      raw: true,
    });

    if(!booking){
        res.statusCode = 404
        return res.json({
          message: "Booking couldn't be found",
          statusCode: 404,
        });
    }

    if(booking.userId !== id){
        res.statusCode = 403
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    if(startDate > endDate){
        res.statusCode = 400
        return res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            endDate: "endDate cannot come before startDate",
          },
        });
    }

    if(startDate < today || endDate < today){
      console.log("\n\n\n", 'BYEBYEBYEBEY', "\n\n\n");
        res.statusCode = 403
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    

    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      raw: true,
    });


    let bookingConflict = false;
    bookings.forEach((eachBooking) => {
      let reqStartDateParse = Date.parse(startDate);
      let reqEndDateParse = Date.parse(endDate);
      let existingStartBooking = Date.parse(eachBooking.startDate);
      let existingEndBooking = Date.parse(eachBooking.endDate);

      if (
        (reqStartDateParse >= existingStartBooking && eachBooking.id !== booking.id &&
          reqStartDateParse <= existingEndBooking) ||
        (reqEndDateParse >= existingStartBooking && eachBooking.id !== booking.id && 
          reqEndDateParse <= existingEndBooking)
      ) {
        bookingConflict = true;
        res.statusCode = 403;
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: `Start date conflicts with an existing booking ${booking.startDate}`,
            endDate: `End date conflicts with an existing booking ${booking.endDate}`,
          },
        });
      }
    });

    booking.set({
        spotId: booking.spotId,
        userId: id,
        startDate,
        endDate,
    })

    // console.log('\n\n\n', booking, '\n\n\n')

    await booking.save()
    res.json(booking)
})


router.delete('/:bookingId', requireAuth, async(req, res) => {
    const {user} = req
    // console.log(user)
    const id = user.id
    const today = new Date().toISOString().slice(0, 10);
    console.log(today)


    console.log(req.params.bookingId)

    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking){
        res.statusCode = 404
        return res.json({
          message: "Booking couldn't be found",
          statusCode: 404,
        });
    }

    // console.log('booking', booking)

    if(booking.userId !== id){
        res.statusCode = 403;
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    if(booking.startDate < today){
        // console.log('hi')
        res.statusCode = 403
        return res.json({
          message: "Bookings that have occured can't be deleted",
          statusCode: 403,
        });
    }

    await booking.destroy()
    res.statusCode = 200
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
})
















module.exports = router