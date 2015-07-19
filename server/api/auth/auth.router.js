var express = require('express');
var AuthCtrl = require('./auth.controller.js');

var router = express.Router();

router.get('/', AuthCtrl.authenticateUser);
router.get('/paypal-account/:code', AuthCtrl.getPayPalUser);
router.get('/braintree-client-token', AuthCtrl.getBrainTreeClientToken);

module.exports = router;
