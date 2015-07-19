var express = require('express');
var UsersCtrl = require('./users.controller.js');

var router = express.Router();

router.get('/', UsersCtrl.getUsers);
router.post('/', UsersCtrl.createUser);

module.exports = router;
