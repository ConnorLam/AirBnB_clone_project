const express = require('express')

const {setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models')
const { check } = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')

const router = express.Router()

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsy: true})
        .withMessage('Please provide a password.'),
    handleValidationErrors
]
// checks to see whether or not req.body.credential or req.body.password
// are empty, if one is emoty than you will get an error with response

//logging in
router.post('/', validateLogin, async (req, res, next) => {
    const {credential, password} = req.body;
    let user = await User.login({ credential, password })

    if (!user) {
        const err = new Error('Login failed')
        err.status = 401
        err.title = 'Login failed'
        err.errors = ['The provided credentials were invalid.']
        return next(err)
    }

    const token = await setTokenCookie(res, user)
    console.log('!!!!', user)
    user.dataValues.token = token
    return res.json(
        user
    )
})

//logging out (deleting token)
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success'})
})


//returns the session user as JSON under the key of user
router.get('/', restoreUser, (req, res) => {
    const {user} = req
    console.log(user.firstName);
    if (user) {
        return res.json({
            user: user.toSafeObject()
        })
    } else {
        return res.json({})
    }
})



module.exports = router

//ERROR WITH VALIDATE LOGIN ON LOGIN ROUTE