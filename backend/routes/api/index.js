const router = require('express').Router();
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models')
const {restoreUser} = require('../../utils/auth.js')

router.use(restoreUser)

// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body })
// })

// // gets demo user and calls setTokenCookie
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user);
//     return res.json({ user })
// })


// // check to see if req.user key has been populate by middleware properly
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })


// // if no session user route will return error, otherwise will return
// // session user info
// const {requireAuth} = require('../../utils/auth.js');
// router.get(
//     '/require-auth', requireAuth, (req, res) => {
//         return res.json(req.user);
//     }
// )


//NOTE: make sure to keep restoreUser middleware connected before 
// any other middleware or orute handlers are connected to the router
// allows all route gandlers connect to router to retrieve the current
// user on req object as req.user 
// if theres is NO vlaid current user session, then req.user will be set 
// to null

module.exports = router;