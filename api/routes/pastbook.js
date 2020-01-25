var express = require('express');
var router = express.Router();

var SessionController = require('../controllers/Session');

router.post('/', SessionController.save)

module.exports = router;
