const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");

const router = express.Router();


router.get('/', async(req, res) => {
    res.send('this is a test')
})

module.exports = router