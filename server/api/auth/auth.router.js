var express = require('express');
var AuthCtrl = require('./auth.controller.js');

var router = express.Router();

router.get('/', AuthCtrl.authenticateUser);
router.get('/paypal-account', AuthCtrl.getPayPalUser);

module.exports = router;
