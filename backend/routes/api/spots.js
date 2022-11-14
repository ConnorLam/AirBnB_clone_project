const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize')

const router = express.Router();


const checkValidate = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 0"'),
  check("size")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Size must be greater than or equal to 0"),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors,
];


router.get('/', checkValidate, async (req, res) => {

  let { size, page } = req.query;
  if (!page) page = 1;
  if (!size) size = 20;
  page = parseInt(page);
  size = parseInt(size);
  const pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const allSpotsPaginate = await Spot.findAll({
    ...pagination
  })

  let spots = []
  for(let spot of allSpotsPaginate){
    const allRating = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    let image = await Image.findOne({
      where: { spotId: spot.id },
      attributes: ["url"],
    });

    if (!image) {
      data = {
        ...spot.dataValues,
        avgRating: allRating[0].avgRating,
        previewImage: null,
      };
      spots.push(data);
    } else {
      data = {
        ...spot.dataValues,
        avgRating: allRating[0].avgRating,
        previewImage: image.url,
      };
      spots.push(data);
    }
  }

  res.json({Spots: spots, page: page, size: size})
  
    // const allSpots = await Spot.findAll({
    //   attributes: {
    //     include: [
    //         [
    //             sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"
    //         ],
    //     ],
    //   },
    //   include: [
    //     {
    //         model: Review,
    //         attributes: []
    //     }
    //   ],
    //   group: ['Spot.id'],
    //   raw: true
    // });

    // let spotArr = []

    // for(let spot of allSpots){
    //     let Spots = {}
    //     Spots.id = spot.id,
    //     Spots.ownerId = spot.ownerId,
    //     Spots.address = spot.address,
    //     Spots.city = spot.city,
    //     Spots.state = spot.state,
    //     Spots.country = spot.country,
    //     Spots.lat = spot.lat,
    //     Spots.lng = spot.lng,
    //     Spots.name = spot.name,
    //     Spots.description = spot.description,
    //     Spots.price = spot.price,
    //     Spots.createdAt = spot.createdAt,
    //     Spots.updatedAt = spot.updatedAt,
    //     Spots.avgRating = spot.avgRating

    //     let images = await Image.findAll({
    //         where: {spotId: spot.id},
    //         attributes: ['url', 'previewImage'],
    //         raw: true
    //     })

    //     for(let image of images){
    //         if(image.previewImage){
    //             Spots.previewImage = image.url
    //         }
    //     }
    //     if(!Spots.previewImage) {
    //         Spots.previewImage = null
    //     }

    //     spotArr.push(Spots)
    // }

    // res.json({Spots: spotArr})
})

router.get('/current', requireAuth, async (req, res) => {
    const {user} = req
    // console.log(user)
    if (user){
        const userSpots = await Spot.findAll({
            where: {ownerId: user.id},
            attributes: {
                include: [
                    [
                        sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'
                    ]
                ]
            },
            include: [
                {
                    model: Review,
                    attributes: []
                }
            ],
            group: ['Spot.id'],
            raw:true
            
        })
        
        let spotArr = [];

        for (let spot of userSpots) {
            let Spots = {};
            (Spots.id = spot.id),
            (Spots.ownerId = spot.ownerId),
            (Spots.address = spot.address),
            (Spots.city = spot.city),
            (Spots.state = spot.state),
            (Spots.country = spot.country),
            (Spots.lat = spot.lat),
            (Spots.lng = spot.lng),
            (Spots.name = spot.name),
            (Spots.description = spot.description),
            (Spots.price = spot.price),
            (Spots.createdAt = spot.createdAt),
            (Spots.updatedAt = spot.updatedAt),
            (Spots.avgRating = spot.avgRating);

          let images = await Image.findAll({
            where: { spotId: spot.id },
            attributes: ["url", "previewImage"],
            raw: true,
          });

          for (let image of images) {
            if (image.previewImage) {
              Spots.previewImage = image.url;
            }
          }
          if (!Spots.previewImage) {
            Spots.previewImage = null;
          }

          spotArr.push(Spots);
        }

        // console.log()
        // if(spotArr.length >= 1){
            return res.json({Spots: spotArr})
        // } 
        // else {
            // res.status(404)
            // return res.json({message: 'User does not own any spots'})
        // }
    } 

})

router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId

    const spot = await Spot.findOne({
      where: { id: id },
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        ],
      },
      include: [
        {
            model: Review,
            attributes: [],
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    ],
      group: ["Spot.id", 'User.id'],
    //   raw:true 
    });
    // console.log('test console log', spot.dataValues.numReviews)

    if(!spot){
        res.statusCode = 404
        return res.json({
            message: `Spot couldn't be found`,
            statusCode: 404
        })
    }
    // let spots = eval(spot)
    // console.log('111111111', spot)

    const imagesData = await Image.findAll({
        where: {spotId: req.params.spotId}
    })
    // console.log(imagesData)


    let imagesArr = []
    for (let image of imagesData){
        let imagesObj = {}
        if(image.spotId){
          imagesObj.id = image.id
          imagesObj.imageableId = image.spotId
          imagesObj.url = image.url
          imagesArr.push(imagesObj)
        } 
    }

    // let bookingsArr = []
    // const bookingsData = await Booking.findAll({
    //   where: {spotId: req.params.spotId}
    // })

    // for (let booking of bookingsData){
    //   let bookingsObj = {}
    //   if(booking.spotId){
    //     bookingsObj.id = booking.id
    //     bookingsObj.startDate = booking.startDate
    //     bookingsObj.endDate = booking.endDate
    //   }
    // }
    // console.log('        test         ', imagesArr)

    let details = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: spot.dataValues.numReviews,
        avgRating: spot.dataValues.avgRating,
        Images: imagesArr,
        Owner: {
            id: spot.User.dataValues.id,
            firstName: spot.User.dataValues.firstName,
            lastName: spot.User.dataValues.lastName
        },
        // Bookings: bookingsArr
        
    }
    
    res.json(details)
})

// req.body destructure to get all keys:values needs
// use the restore user to get a user and their id
// create a new spot with everything
// have validations for if everything is there (maybe a check like you have in the user routes?)
// console.log(check)
    const validatePost = [
      check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
      check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
      check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
      check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
      check("lat")
        .exists({ checkFalsy: true })
        .isNumeric({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
      check("lng")
        .exists({ checkFalsy: true })
        .isNumeric({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
      check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
      check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
      check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
      handleValidationErrors,
    ];


router.post('/', requireAuth, validatePost, async (req, res) => {
    const {user} = req
    const id = user.id
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const newSpot = await Spot.create({
        ownerId: id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(newSpot)
})

router.post("/:spotId/images", requireAuth, async (req, res) => {
    const {user} = req
    const {url, previewImage} = req.body

    const spot = await Spot.findOne({
        where: {id: req.params.spotId}
    })
    
    if (!spot){
        return res.status(404),
          res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
          });
    }

    let newImage;
    if(spot.ownerId === user.id){
        newImage = await Image.create({
            url,
            previewImage,
            spotId: req.params.spotId,
            reviewId: null,
            userId: user.id,
        })
    } else {
        res.status(401);
        res.json({
          message: "Unauthorized, must be owner to post an image",
          statusCode: 401,
        });
    }

    res.json({
        id: newImage.id,
        imageableId: newImage.spotId,
        url: newImage.url
    })
});

router.put('/:spotId', requireAuth, validatePost, async (req, res) => {
    const {user} = req
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const id = user.id
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.statusCode = 404
        return res.json({
          message: "Spot couldn't be found",
          statusCode: 404,
        });
    }

    if(spot.ownerId !== id){
        res.statusCode = 401
        return res.json({
          message: "Unauthorized, must be owner to edit a spot",
          statusCode: 401,
        });
    }

    spot.set({
      ownerId: id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    await spot.save()
    res.json(spot)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const {user} = req
    const id = user.id

    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.statusCode = 404
        return res.json({
          message: "Spot couldn't be found",
          statusCode: 404,
        });
    }

    if (spot.ownerId !== id){
        res.statusCode = 401
        return res.json({
          message: "Unauthorized, must be owner to delete a spot",
          statusCode: 401,
        });
    }

    await spot.destroy()
    res.statusCode = 200
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

})

router.get('/:spotId/reviews', async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  
  if(!spot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  
  const Reviews = await Review.findAll({
    where: {spotId: req.params.spotId},
    include: [
      {
        model: User, 
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Image,
        attributes: ['id', ['spotId', 'imageableId'], 'url']
      }
    ]
  })

  // let review = JSON.parse(JSON.stringify(Reviews));
  // const images = await Image.findAll({
  //   where: {
  //     [Op.not]: [reviewId: null]
  //   }
  // })

  res.json({Reviews})

})
// console.log(check('     '.notEmpty().withMessage('test'), handleValidationErrors))

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

router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res) => {
  const {user} = req
  const {review, stars} = req.body
  const id = user.id
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    res.statusCode = 404
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const reviewCheck = await Review.findOne({
    where: {
      userId: id,
      spotId: spot.id
    }
  })

  if(reviewCheck){
    res.statusCode = 403
    const error = new Error()
    console.log('!!!!!!', error)
    error.status = 403
    error.errors = ["User already has a review for this spot"];
    // return res.json({
    //   message: "User already has a review for this spot",
    //   statusCode: 403,
    // });
    throw error 
  }

  
  const userReview = await Review.create({
    userId: id,
    spotId: Number(req.params.spotId),
    review,
    stars
  })


  res.json(userReview)
})



router.get('/:spotId/bookings', async (req, res) => {
  const {user} = req

  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot){
    res.statusCode = 404
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if(spot.ownerId === user?.id){
    const bookings = await Booking.findAll({
      where: {spotId: req.params.spotId},
      attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
      order: [['startDate', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
    })
    // console.log(bookings)
    return res.json({ Bookings: bookings });
  } else {
    const bookings = await Booking.findAll({
      where: {spotId: req.params.spotId},
      attributes: ['id', 'userId', 'spotId', 'startDate', 'endDate'],
      order: [['startDate', 'ASC']]
    })
    return res.json({Bookings: bookings})
  }

})


router.post('/:spotId/bookings', requireAuth, async(req, res) => {
  const {user} = req
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const {startDate, endDate} = req.body

  // console.log(startDate, endDate)
  
  const bookings = await Booking.findAll({
    where: {
      spotId: spot.id
    },
    raw: true
  })

  let bookingConflict = false
  bookings.forEach(booking => {
    let reqStartDateParse = Date.parse(startDate)
    let reqEndDateParse = Date.parse(endDate)
    let existingStartBooking = Date.parse(booking.startDate)
    let existingEndBooking = Date.parse(booking.endDate)

    if((reqStartDateParse >= existingStartBooking && reqStartDateParse <= existingEndBooking)
    || (reqEndDateParse >= existingStartBooking && reqEndDateParse <= existingEndBooking)){
      bookingConflict = true
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
  })

  // const bookingSet = new Set(booking)
  // console.log(bookings)


  // startDate = new Date(startDate)
  // endDate = new Date(endDate)
  // console.log(startDate.toLocaleDateString())

  if(spot.ownerId === user.id){
    res.statusCode = 403
    return res.json({
      message: "Owner of spot cannot book for spot",
      statusCode: 403,
    });
  }

  // console.log(new Date(startDate).getTime());
  // console.log(new Date(endDate).getTime());

  if(new Date(startDate).getTime() >= new Date(endDate).getTime()){
    res.statusCode = 400
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  // console.log(bookings.length);
  // if(bookings.length >= 1){
  //   res.statusCode = 403
  //   return res.json({
  //     message: "Sorry, this spot is already booked for the specified dates",
  //     statusCode: 403,
  //     errors: {
  //       startDate: "Start date conflicts with an existing booking",
  //       endDate: "End date conflicts with an existing booking",
  //     },
  //   });
  // }
// console.log(startDate.getTime())

  let newBooking;
  if(!bookingConflict){
    newBooking = await Booking.create({
      spotId: spot['id'],
      userId: user['id'],
      startDate: startDate,
      endDate: endDate
    })
  }

  // console.log(newBooking.id)
  res.json(newBooking)
})


module.exports = router