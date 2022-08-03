const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize')

const router = express.Router();


// router.get('/', async(req, res) => {
//     const Spots = await Spot.findAll({
//     //     attributes: {
//     //         include: [
//     //         [sequelize.literal('Images.url'), 'previewImage'],
//     //     ],
//     //     },
//     //     include: [
//     //         {
//     //             model: Image,
//     //             where: {
//     //                 previewImage: true
//     //             },
//     //             attributes: []
//     //         }
//     // ]
//     })

    
//     for (let spot of Spots) {
//         // console.log('!!!!!!!!', spot)
//         spot.dataValues.avgRating = await Review.findAll({
            
//             attributes: {
//                 where: spot.dataValues.id,
//                 include: [
//                     [
//                         sequelize.fn("AVG", sequelize.col('stars')), 
//                     "avgRating"
//                     ]
//                 ],
//             }
//         })
//     }

//     for(let image of Spots){
//         image.dataValues.previewImage = await Image.findAll({
//             attributes: ['url']
//         })
//     }
//     // console.log('!!!!!!!!!!!!!!!!!!!', spot)
//     // spots.forEach(spot => {
//     //     spot.dataValues.avgRating = await Review.findAll({
//     //         attributes: {
//     //             include: [
//     //                 [
//     //                     sequelize.fn("AVG", sequelize.col('stars')), 
//     //                     "avgRating"
//     //                 ]
//     //             ]
//     //         }
//     //     })
//     // })

//     // let response = {
//     //     id: spots.id,
//     //     ownerId: spots.ownerId,
//     //     address: spots.address,
//     //     city: spots.city,
//     //     state: spots.state,
//     //     lat: spots.lat,
//     //     lng: spots.lng,
//     //     name: spots.name,
//     //     description: spots.description,
//     //     price: spots.price,
//     //     createdAt: spots.createdAt,
//     //     updatedAt: spots.updatedAt,
//     //     avgRating: revAvg[0].dataValues.avgRating,
//     //     previewImage: spots.previewImage
//     // }
    
//     // console.log('reviewAvg ',revAvg[0])
//     // console.log('!!!!', spots.Spot)
//     res.json({Spots})
// })

// router.get("/", async (req, res) => {
//   const Spots = await Spot.findAll({
//     attributes: {
//       include: [
//         [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
//         [sequelize.literal('Images.url'), 'previewImage']
//       ],

//     },
//     include: [
//         {
//             model: Review,
//             attributes: [],
//         },
//         {
//             model: Image,
//             where: {
//                 previewImage: true
//             },
//             attributes: []
//         }
//     ],
//     group: ["Spot.id"],
//   });

//   return res.json({Spots});
// });

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
      attributes: {
        include: [
            [
                sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"
            ],
        ],
      },
      include: [
        {
            model: Review,
            attributes: []
        }
      ],
      group: ['Spot.id'],
      raw: true
    });

    let spotArr = []

    for(let spot of allSpots){
        let Spots = {}
        Spots.id = spot.id,
        Spots.ownerId = spot.ownerId,
        Spots.address = spot.address,
        Spots.city = spot.city,
        Spots.state = spot.state,
        Spots.country = spot.country,
        Spots.lat = spot.lat,
        Spots.lng = spot.lng,
        Spots.name = spot.name,
        Spots.description = spot.description,
        Spots.price = spot.price,
        Spots.createdAt = spot.createdAt,
        Spots.updatedAt = spot.updatedAt,
        Spots.avgRating = spot.avgRating

        let images = await Image.findAll({
            where: {spotId: spot.id},
            attributes: ['url', 'previewImage'],
            raw: true
        })

        for(let image of images){
            if(image.previewImage){
                Spots.previewImage = image.url
            }
        }
        if(!Spots.previewImage) {
            Spots.previewImage = null
        }

        spotArr.push(Spots)
    }

    res.json({Spots: spotArr})
})

router.get('/current', restoreUser, async (req, res) => {
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
        if(spotArr.length >= 1){
            return res.json({Spots: spotArr})
        } else {
            res.status(404)
            return res.json({message: 'User does not own any spots'})
        }
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

    if(!spot){
        res.status(404)
        res.json({
            message: `Spot couldn't be found`,
            statusCode: 404
        })
    }
    // let spots = eval(spot)
    console.log('111111111', spot)

    const imagesData = await Image.findAll({
        where: {spotId: req.params.spotId}
    })
    console.log(imagesData)


    let imagesObj;
    for (let image of imagesData){
        imagesObj = {}
        imagesObj.id = image.id
        if(image.spotId){
            imagesObj.imageableId = image.spotId
        } else {
            imagesObj.imageableId = image.reviewId
        }
        imagesObj.url = image.url

    }


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
        numReviews: spot.numReviews,
        avgRating: spot.avgRating,
        Images: [{...imagesObj}],
        Owner: {
            id: spot.User.dataValues.id,
            firstName: spot.User.dataValues.firstName,
            lastName: spot.User.dataValues.lastName
        }
        
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


router.post('/', restoreUser, validatePost, async (req, res) => {
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



// console.log(check('     '.notEmpty().withMessage('test'), handleValidationErrors))


module.exports = router