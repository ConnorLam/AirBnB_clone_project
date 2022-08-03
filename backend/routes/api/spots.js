const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");

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

router.get("/", async (req, res) => {
  const Spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        [sequelize.literal('Images.url'), 'previewImage']
      ],

    },
    include: [
        {
            model: Review,
            attributes: [],
        },
        {
            model: Image,
            where: {
                previewImage: true
            },
            attributes: []
        }
    ],
    group: ["Spot.id"],
  });

  return res.json({Spots});
});

module.exports = router