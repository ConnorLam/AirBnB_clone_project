const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking, sequelize, Like } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const { Op } = require('sequelize');


const router = express.Router();

router.delete('/:likeId', requireAuth, async (req, res) => {
    const {user} = req
    const id = user.id

    const like = await Like.findByPk(req.params.likeId)

    console.log(like)

    if(!like){
        res.statusCode = 404;
        return res.json({
            message: "Like couldn't be found",
            statusCode: 404
        })
    }

    if (like.userId !== id){
        res.statusCode = 403;
        return res.json({
          message: "Forbidden",
          statusCode: 403,
        });
    }

    await like.destroy()
    res.statusCode = 200
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
})

module.exports = router