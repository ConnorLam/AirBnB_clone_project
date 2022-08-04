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

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const {user} = req
    const {url, previewImage} = req.body
    const review = await Review.findByPk(req.params.reviewId)
    const images = await Image.findAll({
        where: {reviewId: req.params.reviewId}
    })


    if(!review){
        res.statusCode = 404
        return res.json({
          message: "Review couldn't be found",
          statusCode: 404,
        });
    }

    if(review.userId !== user.id){
        res.statusCode = 403
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    if(images.length >= 10){
        res.statusCode = 403
        return res.json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403,
        });
    }
    

    
    const image = await Image.create({
        url,
        previewImage,
        userId: user.id,
        reviewId: req.params.reviewId,
        spotId: null
    })

    let response = {
        id: image.id,
        imageableId: image.reviewId,
        url: image.url
    }

    res.json(response)
})

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required."),
  check("stars")
    .exists({ checkFalsy: true })
    .isNumeric({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),

  handleValidationErrors,
];

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const {user} = req
    const {review, stars} = req.body
    const id = user.id
    const reviewData = await Review.findByPk(req.params.reviewId)
    if(!reviewData){
        res.statusCode = 404
        return res.json({
          message: "Review couldn't be found",
          statusCode: 404,
        });
    }

    if(user.id !== reviewData.userId){
        res.statusCode = 403;
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    reviewData.set({
        userId: user.id,
        spotId: reviewData.spotId,
        review,
        stars
    })
    await reviewData.save()

    res.json(reviewData)

    
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const {user} = req
    const id = user.id;

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
      res.statusCode = 404;
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    if (review.userId !== id) {
      res.statusCode = 403;
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    await review.destroy();
    res.statusCode = 200;
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
})


module.exports = router