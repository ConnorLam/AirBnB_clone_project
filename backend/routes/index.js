const express = require('express');
const router = express.Router();
const apiRouter = require('./api')

//setting a cookie on the response with name of XSRF-TOKEN to the value of the req.csrfToken method's return. Then 
//send the token as the response for easy retrieval
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    });
});

router.use('/api', apiRouter)

module.exports = router