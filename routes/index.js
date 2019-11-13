var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.use('/user', require('../database/controller/user'));
router.use('/todo', require('../database/controller/todo'));
module.exports = router;