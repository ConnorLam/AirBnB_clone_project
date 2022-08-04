const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize')

const router = express.Router();


router.get('/current', requireAuth, async(req, res) => {
    const {user} = req
    // console.log(user)
    const id = user.id
    const Reviews = await Review.findAll({
        where: {userId: id},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['description', 'createdAt', 'updatedAt']}
            }
        ]
    })
    // console.log('!!!!', JSON.parse(JSON.stringify(Reviews)))
    // console.log(Reviews[0].Review)
    let review = JSON.parse(JSON.stringify(Reviews));
    const imagesData = await Image.findAll({
        where: {userId: id}
    })

    let imagesArr = [];
    let imagesObj;
    for (let image of imagesData) {
        imagesObj = {};
        if (image.reviewId) {
            imagesObj.id = image.id;
            imagesObj.imageableId = image.reviewId;
            imagesObj.url = image.url;
            imagesArr.push(imagesObj)
        } 
        // if(imagesObj.length === 0) break
        // else imagesArr.push(imagesObj)
    //   imagesObj.url = image.url;
    //   imagesArr.push(imagesObj);
    }

    review[0].Images = imagesArr
    // console.log(review)

    // let details = {
    //     review
    // }
    
    res.json({Reviews: review})
})





module.exports = router