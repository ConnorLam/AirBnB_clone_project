const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize')

const router = express.Router();



router.delete('/:imageId', requireAuth, async(req, res) => {

    const {user} = req
    const id = user.id

    const image = await Image.findByPk(req.params.imageId)

    if(!image){
        res.statusCode = 404
        return res.json({
          message: "Image couldn't be found",
          statusCode: 404,
        });
    }

    if(image.userId !== id){
        res.statusCode = 403;
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    await image.destroy()
    res.statusCode = 200
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });


})









module.exports = router