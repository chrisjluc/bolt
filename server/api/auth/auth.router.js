var express = require('express');
var AuthCtrl = require('./auth.controller.js');


var router = express.Router();

router.get('/', AuthCtrl.authenticateUser);

module.exports = router;
