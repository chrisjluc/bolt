var express = require('express');
var GroupsCtrl = require('./groups.controller.js');

var router = express.Router();

router.get('/', GroupsCtrl.getGroups);
router.post('/', GroupsCtrl.createGroup);
router.put('/:groupId/users/:userId', GroupsCtrl.addUserToGroup);
router.delete('/:groupId/users/:userId', GroupsCtrl.removeUserFromGroup);
router.get('/:id', GroupsCtrl.getGroup);

module.exports = router;
