var express = require('express');
var sendGridCtrl = require('./sendgrid.controller.js');

var router = express.Router();

router.post('/send-email', sendGridCtrl.sendEmail);

module.exports = router;
