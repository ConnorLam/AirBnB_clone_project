const express = require('express');
const router = express.Router();

router.get('/hello/world', (req, res) => {
    console.log('testing')
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router