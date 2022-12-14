// store auth helper functions
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig

// sends a JWT Cookie
// used in login and signup routes
const setTokenCookie = (res, user) => {
    //create the token
    const token = jwt.sign(
        {data: user.toSafeObject() },
        secret,
        {expiresIn: parseInt(expiresIn)} //604,800 = 1 week
    )
    
    const isProduction = process.env.NODE_ENV === "production";
    
    //set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    })

    return token
}

// restores the session user based on contents of JWT cookie
const restoreUser = (req, res, next) => {
    //token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err){
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
            // console.log('!!!', req.user)
        } catch (e) {
            res.clearCookie('token');
            return next()
        }

        if(!req.user) res.clearCookie('token')

        return next()
    })
}

// requiring a sessions user to be authenticated before accesing a route
const requireAuth = function (req, _res, next){
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err)
}

module.exports = { setTokenCookie, restoreUser, requireAuth }