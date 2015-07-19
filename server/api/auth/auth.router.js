var express = require('express');
var AuthCtrl = require('./auth.controller.js');

var router = express.Router();

router.post('/', AuthCtrl.authenticateUser);
router.get('/user', AuthCtrl.ensureAuthenticated, AuthCtrl.getUser);
router.get('/paypal-account/:code', AuthCtrl.getPayPalUser);
router.get('/braintree-client-token', AuthCtrl.getBrainTreeClientToken);
router.get('/parse-token', AuthCtrl.parseJoinToken);

module.exports = router;
