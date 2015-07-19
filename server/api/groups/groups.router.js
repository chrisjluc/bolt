var express = require('express');
var GroupsCtrl = require('./groups.controller.js');

var router = express.Router();

router.get('/', GroupsCtrl.getGroups);
router.post('/', GroupsCtrl.createGroup);

module.exports = router;
