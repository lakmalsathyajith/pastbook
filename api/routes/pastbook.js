var express = require('express');
var router = express.Router();

var SessionController = require('../controllers/Session');

router.get('/album/:id', SessionController.get);
router.post('/album', SessionController.save);

module.exports = router;
